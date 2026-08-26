import "../polyfills/nodeBufferSlowBuffer";
import "../config/loadingEnv";
import "../config/dotenv";
import "../db/index";

import Express, { Express as ExpressApp } from "express";
import fs from "fs";
import path from "path";

import authRouter from "../routes/auth/auth";
import ownerRouter from "../routes/owner/owner.index";
import customerRouter from "../routes/customer/customer.index";
import testRouter from "../routes/test/test.index";
import adminRouter from "../routes/admin/admin.index";
import masterRouter from "../routes/master/master.index";
import driverRouter from "../routes/driver/driver.index";
import middlewares from "../middlewares/middleware.index";
import { AESSecurtiyEncryption } from "../config/encryption";
import { register, httpMetricsMiddleware } from "../metrics/httpMetrics";

export const API_VERSION = process.env.VERSION || "v1";

/**
 * Builds the Express app with the same middleware + /v1/* routes
 * the legacy server used. NestJS mounts this via ExpressAdapter.
 */
export function createExpressApp(): ExpressApp {
  const app = Express();

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "swc-api",
      framework: "nestjs",
      pid: process.pid,
    });
  });

  middlewares.globalMiddlewares(app);
  app.use(httpMetricsMiddleware);

  app.get("/metrics", async (_req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

  const v = API_VERSION;
  app.use(`/${v}/auth`, AESSecurtiyEncryption, authRouter);
  app.use(`/${v}/owner`, AESSecurtiyEncryption, ownerRouter);
  app.use(`/${v}/customer`, AESSecurtiyEncryption, customerRouter);
  app.use(`/${v}/test`, AESSecurtiyEncryption, testRouter);
  app.use(`/${v}/admin`, AESSecurtiyEncryption, adminRouter);
  app.use(`/${v}/master`, AESSecurtiyEncryption, masterRouter);
  app.use(`/${v}/driver`, AESSecurtiyEncryption, driverRouter);

  const uploadDir = path.join(__dirname, "../assets/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return app;
}
