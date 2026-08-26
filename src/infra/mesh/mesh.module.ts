import { Global, Module } from "@nestjs/common";
import { MeshHttpService } from "./mesh-http.service";
import { ConnectivityController } from "./connectivity.controller";

@Global()
@Module({
  controllers: [ConnectivityController],
  providers: [MeshHttpService],
  exports: [MeshHttpService],
})
export class MeshModule {}
