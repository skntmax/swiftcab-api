import { Body, Controller, Get, Post } from "@nestjs/common";
import { DryRunService } from "./dry-run.service";

/**
 * Nest dry-run endpoints (same helpers used by Express test controller).
 *
 *   POST /nest/dry-run/redis   — publish sample to Redis for payment consumer
 *   GET  /nest/dry-run/redis   — read last payload from Redis key
 *   GET  /nest/dry-run/payment — mesh HTTP ping payment via Consul
 */
@Controller("nest/dry-run")
export class DryRunController {
  constructor(private readonly dryRun: DryRunService) {}

  @Post("redis")
  publishRedis(@Body() body: unknown) {
    return this.dryRun.sendToRedis(body);
  }

  @Get("redis")
  lastRedis() {
    return this.dryRun.readLastFromRedis();
  }

  @Get("payment")
  pingPayment() {
    return this.dryRun.pingPaymentViaMesh();
  }
}
