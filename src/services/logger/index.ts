import winston from "winston"

const fileTransports: winston.transport[] = [
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
  new winston.transports.File({ filename: "logs/http.log", level: "http" }),
  new winston.transports.File({ filename: "logs/combined.log" }),
]

const lokiHost = process.env.LOKI_HOST?.trim()
if (lokiHost) {
  // winston-loki uses `export =`; require keeps TS/CommonJS happy
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const LokiTransport = require("winston-loki") as typeof import("winston-loki")
  fileTransports.push(
    new LokiTransport({
      host: lokiHost,
      json: true,
      labels: {
        service: process.env.LOKI_SERVICE_NAME || "swc-service",
        env: process.env.NODE_ENV || "development",
      },
      basicAuth: process.env.LOKI_BASIC_AUTH || undefined,
      interval: Number(process.env.LOKI_BATCH_INTERVAL_SECONDS) || 5,
      replaceTimestamp: true,
      onConnectionError: (err: unknown) =>
        console.error("[winston-loki]", err),
    })
  )
}

const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "swc-service" },
  transports: fileTransports,
})

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

export default logger
