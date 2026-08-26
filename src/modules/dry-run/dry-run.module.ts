import { Global, Module } from "@nestjs/common";
import { DryRunService } from "./dry-run.service";
import { DryRunController } from "./dry-run.controller";

@Global()
@Module({
  controllers: [DryRunController],
  providers: [DryRunService],
  exports: [DryRunService],
})
export class DryRunModule {}
