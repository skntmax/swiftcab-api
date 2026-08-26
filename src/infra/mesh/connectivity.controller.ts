import { Controller, Get } from "@nestjs/common";
import { ConsulService } from "../consul/consul.service";
import { RedisService } from "../redis/redis.service";
import { KafkaService } from "../kafka/kafka.service";
import { MeshHttpService } from "./mesh-http.service";

@Controller("nest/connectivity")
export class ConnectivityController {
  constructor(
    private readonly consul: ConsulService,
    private readonly redis: RedisService,
    private readonly kafka: KafkaService,
    private readonly mesh: MeshHttpService,
  ) {}

  @Get()
  async status() {
    const [consul, redis] = await Promise.all([
      this.consul.status(),
      this.redis.ping(),
    ]);
    return {
      service: process.env.CONSUL_SERVICE_NAME || "swc-api",
      consul,
      redis: { ...this.redis.connectionInfo(), ...redis },
      kafka: this.kafka.status(),
      mesh: {
        api: await this.mesh.resolveBase("api"),
        payment: await this.mesh.resolveBase("payment"),
        medium: await this.mesh.resolveBase("medium"),
        gateway: await this.mesh.resolveBase("gateway"),
      },
    };
  }
}
