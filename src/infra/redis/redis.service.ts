import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

export type RedisMessageHandler = (msg: {
  channel: string;
  /** JSON-parsed value when possible, otherwise the raw string */
  payload: unknown;
  raw: string;
}) => Promise<void> | void;

export type RedisSubscription = {
  channels: string[];
  unsubscribe: () => Promise<void>;
};

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client!: Redis;
  private readonly subscribers: Redis[] = [];

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const host = this.config.get<string>("REDIS_HOST") || "127.0.0.1";
    const portRaw = Number(this.config.get<string>("REDIS_PORT") || 6379);
    const port = Number.isFinite(portRaw) && portRaw > 0 ? portRaw : 6379;
    const password = (this.config.get<string>("REDIS_PASSWORD") || "").trim();
    const db = Number(this.config.get<string>("REDIS_DB") || 0);

    this.client = new Redis({
      host,
      port,
      ...(password ? { password } : {}),
      db: Number.isFinite(db) ? db : 0,
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => (times > 3 ? null : Math.min(times * 200, 2000)),
    });

    this.client.on("connect", () =>
      this.logger.log(`Redis connected ${host}:${port} db=${db}`),
    );
    this.client.on("error", (err) =>
      this.logger.warn(`Redis error: ${err.message}`),
    );
  }

  async onModuleDestroy() {
    for (const sub of this.subscribers.splice(0)) {
      try {
        await sub.quit();
      } catch {
        /* ignore */
      }
    }
    try {
      await this.client?.quit();
    } catch {
      /* ignore */
    }
  }

  getClient(): Redis {
    return this.client;
  }

  /** Separate connection required for Redis pub/sub subscribe. */
  duplicate(): Redis {
    return this.client.duplicate();
  }

  /**
   * Publish to a channel (string or JSON-serialized object).
   * Returns subscriber count that received the message (0 if nobody listening).
   */
  async publish(
    channel: string,
    message: string | Record<string, unknown> | unknown,
  ): Promise<number> {
    const value =
      typeof message === "string" ? message : JSON.stringify(message);
    return this.client.publish(channel, value);
  }

  /**
   * Subscribe to one or more channels. Uses a dedicated connection.
   * Call from OnModuleInit (or after boot) — runs until unsubscribe / shutdown.
   */
  async subscribe(
    channel: string | string[],
    handler: RedisMessageHandler,
  ): Promise<RedisSubscription | null> {
    const channels = (Array.isArray(channel) ? channel : [channel]).filter(
      Boolean,
    );
    if (!channels.length || !this.client) {
      this.logger.warn("Redis subscribe skipped — no channels or client");
      return null;
    }

    try {
      const sub = this.client.duplicate();
      this.subscribers.push(sub);
      await sub.subscribe(...channels);
      sub.on("message", (ch, raw) => {
        if (!channels.includes(ch)) return;
        let payload: unknown = raw;
        try {
          payload = JSON.parse(raw);
        } catch {
          /* keep raw string */
        }
        void Promise.resolve(handler({ channel: ch, payload, raw })).catch(
          (err) =>
            this.logger.warn(
              `Redis handler error channel=${ch}: ${
                err instanceof Error ? err.message : err
              }`,
            ),
        );
      });
      this.logger.log(`Redis subscribed → [${channels.join(", ")}]`);

      return {
        channels,
        unsubscribe: async () => {
          try {
            await sub.unsubscribe(...channels);
            await sub.quit();
          } catch {
            /* ignore */
          }
          const idx = this.subscribers.indexOf(sub);
          if (idx >= 0) this.subscribers.splice(idx, 1);
        },
      };
    } catch (err) {
      this.logger.warn(
        `Redis subscribe failed: ${err instanceof Error ? err.message : err}`,
      );
      return null;
    }
  }

  /** SET key to JSON (optional TTL seconds). */
  async setJson(
    key: string,
    value: unknown,
    ttlSec?: number,
  ): Promise<"OK" | null> {
    const raw = JSON.stringify(value);
    if (ttlSec != null && ttlSec > 0) {
      return this.client.set(key, raw, "EX", ttlSec);
    }
    return this.client.set(key, raw);
  }

  /** GET key and JSON-parse (null if missing / invalid JSON). */
  async getJson<T = unknown>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    if (raw == null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async ping(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const started = Date.now();
    try {
      const pong = await this.client.ping();
      return { ok: pong === "PONG", latencyMs: Date.now() - started };
    } catch (err) {
      return {
        ok: false,
        latencyMs: Date.now() - started,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  connectionInfo() {
    return {
      host: this.config.get<string>("REDIS_HOST") || "127.0.0.1",
      port: Number(this.config.get<string>("REDIS_PORT") || 6379),
      db: Number(this.config.get<string>("REDIS_DB") || 0),
    };
  }

  status() {
    return {
      ...this.connectionInfo(),
      subscribers: this.subscribers.length,
    };
  }
}
