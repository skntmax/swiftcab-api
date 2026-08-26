import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { OwnerModule } from "./modules/owner/owner.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { AdminModule } from "./modules/admin/admin.module";
import { MasterModule } from "./modules/master/master.module";
import { DriverModule } from "./modules/driver/driver.module";
import { TestModule } from "./modules/test/test.module";
import { HealthModule } from "./modules/health/health.module";
import { InfraModule } from "./infra/infra.module";
import { DryRunModule } from "./modules/dry-run/dry-run.module";
import { nestEnvFilePaths } from "./config/env-files";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: nestEnvFilePaths(),
    }),
    InfraModule,
    DryRunModule,
    HealthModule,
    AuthModule,
    OwnerModule,
    CustomerModule,
    AdminModule,
    MasterModule,
    DriverModule,
    TestModule,
  ],
})
export class AppModule {}
