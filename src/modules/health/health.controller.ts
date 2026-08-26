import { Controller, Get } from "@nestjs/common";
import { API_VERSION } from "../../bootstrap/create-express-app";

@Controller()
export class HealthController {
  @Get("nest/health")
  nestHealth() {
    return {
      status: "ok",
      service: "swc-api",
      framework: "nestjs",
      apiVersion: API_VERSION,
      domains: [
        "auth",
        "owner",
        "customer",
        "admin",
        "master",
        "driver",
        "test",
      ],
      pid: process.pid,
    };
  }
}
