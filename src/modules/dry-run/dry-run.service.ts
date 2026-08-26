import { Injectable, Logger } from "@nestjs/common";
import { RedisService } from "../../infra/redis/redis.service";
import { MeshHttpService } from "../../infra/mesh/mesh-http.service";
import {
  SWC_DRY_RUN_REDIS_CHANNEL,
  SWC_DRY_RUN_REDIS_LAST_KEY,
} from "./dry-run.constants";

export type DryRunRedisPayload = {
  type: "dry-run.redis";
  from: string;
  to: string;
  at: string;
  requestId: string;
  data: unknown;
};

/**
 * General dry-run helpers for test controllers (Redis, mesh HTTP, etc.).
 * Prefer this over ad-hoc clients in Express test routes.
 */
@Injectable()
export class DryRunService {
  private readonly logger = new Logger(DryRunService.name);

  constructor(
    private readonly redis: RedisService,
    private readonly mesh: MeshHttpService,
  ) {}

  /**
   * Publish a dry-run message to Redis (pub/sub + last-key).
   * Payment DryRunConsumer listens on SWC_DRY_RUN_REDIS_CHANNEL.
   */
  async sendToRedis(data?: unknown): Promise<{
    ok: boolean;
    channel: string;
    key: string;
    subscribers: number;
    payload: DryRunRedisPayload;
  }> {
    const payload: DryRunRedisPayload = {
      type: "dry-run.redis",
      from: "swc-api",
      to: "swc-payment",
      at: new Date().toISOString(),
      requestId: `dry-run-${process.pid}-${Date.now()}`,
      data: data ?? { hello: "from swc-api", tip: "payment should consume this" },
    };

    await this.redis.setJson(SWC_DRY_RUN_REDIS_LAST_KEY, payload, 3600);
    const subscribers = await this.redis.publish(
      SWC_DRY_RUN_REDIS_CHANNEL,
      payload,
    );

    this.logger.log(
      `dry-run redis publish channel=${SWC_DRY_RUN_REDIS_CHANNEL} subscribers=${subscribers} id=${payload.requestId}`,
    );

    return {
      ok: true,
      channel: SWC_DRY_RUN_REDIS_CHANNEL,
      key: SWC_DRY_RUN_REDIS_LAST_KEY,
      subscribers,
      payload,
    };
  }

  /** Read last dry-run payload from Redis key (pull check). */
  async readLastFromRedis(): Promise<{
    ok: boolean;
    key: string;
    payload: DryRunRedisPayload | null;
  }> {
    const payload =
      await this.redis.getJson<DryRunRedisPayload>(SWC_DRY_RUN_REDIS_LAST_KEY);
    return {
      ok: Boolean(payload),
      key: SWC_DRY_RUN_REDIS_LAST_KEY,
      payload,
    };
  }

  /** Mesh HTTP dry-run: api → payment /health via Consul */
  async pingPaymentViaMesh(): Promise<{
    ok: boolean;
    baseUrl: string;
    body?: unknown;
    error?: string;
  }> {
    const baseUrl = await this.mesh.resolveBase("payment");
    try {
      const body = await this.mesh.json("payment", "/health", {
        method: "GET",
        headers: { "X-Caller-Service": "swc-api", "X-Dry-Run": "true" },
      });
      return { ok: true, baseUrl, body };
    } catch (err) {
      return {
        ok: false,
        baseUrl,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}
