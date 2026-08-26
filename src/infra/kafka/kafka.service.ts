import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kafka, Producer, Consumer, logLevel } from "kafkajs";

export type KafkaMessageHandler = (msg: {
  topic: string;
  partition: number;
  offset: string;
  key: string | null;
  value: string | null;
  headers: Record<string, string>;
}) => Promise<void> | void;

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka | null = null;
  private producer: Producer | null = null;
  private readonly consumers: Consumer[] = [];
  private enabled = false;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.enabled = this.config.get<string>("KAFKA_ENABLED") !== "false";
    const host = (this.config.get<string>("KAFKA_HOST") || "").trim();
    if (!this.enabled || !host) {
      this.logger.warn(
        "Kafka disabled or KAFKA_HOST unset â€” producer/consumer unavailable",
      );
      return;
    }

    const clientId =
      this.config.get<string>("KAFKA_CLIENT_ID") ||
      this.config.get<string>("CONSUL_SERVICE_NAME") ||
      "swc-api";

    this.kafka = new Kafka({
      clientId,
      brokers: host.split(",").map((b) => b.trim()).filter(Boolean),
      logLevel: logLevel.ERROR,
      retry: { retries: 2, initialRetryTime: 300 },
      connectionTimeout: 3000,
    });
    this.producer = this.kafka.producer({
      retry: { retries: 1 },
    });
    // Non-blocking: do not delay Nest boot if Kafka is down
    void this.producer
      .connect()
      .then(() =>
        this.logger.log(`Kafka producer connected (${host}) as ${clientId}`),
      )
      .catch((err) => {
        this.logger.warn(
          `Kafka connect failed: ${err instanceof Error ? err.message : err}`,
        );
        this.producer = null;
      });
  }

  async onModuleDestroy() {
    try {
      await this.producer?.disconnect();
    } catch {
      /* ignore */
    }
    for (const c of this.consumers) {
      try {
        await c.disconnect();
      } catch {
        /* ignore */
      }
    }
  }

  isReady(): boolean {
    return Boolean(this.producer);
  }

  /** Produce a message to a topic (value as string or JSON object). */
  async publish(
    topic: string,
    message: string | Record<string, unknown>,
    key?: string,
    headers?: Record<string, string>,
  ): Promise<boolean> {
    if (!this.producer) return false;
    const value =
      typeof message === "string" ? message : JSON.stringify(message);
    await this.producer.send({
      topic,
      messages: [
        {
          key,
          value,
          headers: headers
            ? Object.fromEntries(
                Object.entries(headers).map(([k, v]) => [k, Buffer.from(v)]),
              )
            : undefined,
        },
      ],
    });
    return true;
  }

  createConsumer(groupId: string): Consumer | null {
    if (!this.kafka) return null;
    const consumer = this.kafka.consumer({ groupId });
    this.consumers.push(consumer);
    return consumer;
  }

  /**
   * Subscribe to one or more topics and handle each message.
   * Call from OnModuleInit (or after boot) â€” runs until process shutdown.
   */
  async subscribe(
    groupId: string,
    topics: string[],
    handler: KafkaMessageHandler,
    fromBeginning = false,
  ): Promise<boolean> {
    const consumer = this.createConsumer(groupId);
    if (!consumer) {
      this.logger.warn(`Kafka subscribe skipped â€” no client (group=${groupId})`);
      return false;
    }

    try {
      await consumer.connect();
      await consumer.subscribe({ topics, fromBeginning });
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const headers: Record<string, string> = {};
          if (message.headers) {
            for (const [k, v] of Object.entries(message.headers)) {
              if (v == null) continue;
              headers[k] = Buffer.isBuffer(v) ? v.toString() : String(v);
            }
          }
          await handler({
            topic,
            partition,
            offset: message.offset,
            key: message.key?.toString() ?? null,
            value: message.value?.toString() ?? null,
            headers,
          });
        },
      });
      this.logger.log(
        `Kafka consumer group=${groupId} topics=[${topics.join(",")}]`,
      );
      return true;
    } catch (err) {
      this.logger.warn(
        `Kafka subscribe failed: ${err instanceof Error ? err.message : err}`,
      );
      return false;
    }
  }

  status() {
    return {
      enabled: this.enabled,
      ready: this.isReady(),
      host: this.config.get<string>("KAFKA_HOST") || null,
      clientId:
        this.config.get<string>("KAFKA_CLIENT_ID") ||
        this.config.get<string>("CONSUL_SERVICE_NAME") ||
        "swc-api",
      consumers: this.consumers.length,
    };
  }
}

