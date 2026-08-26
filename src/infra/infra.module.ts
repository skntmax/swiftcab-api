import { Global, Module } from "@nestjs/common";
import { ConsulModule } from "./consul/consul.module";
import { RedisModule } from "./redis/redis.module";
import { KafkaModule } from "./kafka/kafka.module";
import { MeshModule } from "./mesh/mesh.module";
import { VaultModule } from "./vault/vault.module";

@Global()
@Module({
  imports: [ConsulModule, RedisModule, KafkaModule, MeshModule, VaultModule],
  exports: [ConsulModule, RedisModule, KafkaModule, MeshModule, VaultModule],
})
export class InfraModule {}
