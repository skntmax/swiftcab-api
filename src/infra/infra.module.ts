import { Global, Module } from "@nestjs/common";
import { ConsulModule } from "./consul/consul.module";
import { RedisModule } from "./redis/redis.module";
import { KafkaModule } from "./kafka/kafka.module";
import { MeshModule } from "./mesh/mesh.module";

@Global()
@Module({
  imports: [ConsulModule, RedisModule, KafkaModule, MeshModule],
  exports: [ConsulModule, RedisModule, KafkaModule, MeshModule],
})
export class InfraModule {}
