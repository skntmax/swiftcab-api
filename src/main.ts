import "reflect-metadata";
import cluster from "cluster";
import os from "os";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { createExpressApp, API_VERSION } from "./bootstrap/create-express-app";
import all_env from "./config/dotenv";
import { ConsulService } from "./infra/consul/consul.service";
import { DryRunService } from "./modules/dry-run/dry-run.service";
import { setDryRunService } from "./modules/dry-run/dry-run.accessor";


async function bootstrapWorker() {
  const logger = new Logger("Bootstrap");
  const expressApp = createExpressApp();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { bodyParser: false },
  );
  app.enableShutdownHooks();
  setDryRunService(app.get(DryRunService));

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  await app.get(ConsulService).registerAfterListen(port);

  logger.log(
    `swc-api (NestJS) worker ${process.pid} on :${port} — routes /${API_VERSION}/*`,
  );
}

async function bootstrap() {
  const multiCore = all_env.MULTI_CORE === "true";

  if (multiCore && cluster.isPrimary) {
    const cpuCount = os.cpus().length;
    console.log(`Primary PID: ${process.pid}`);
    console.log(`Starting ${cpuCount} workers...`);

    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
    return;
  }

  await bootstrapWorker();
}

void bootstrap();
