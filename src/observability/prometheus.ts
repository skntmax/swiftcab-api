import { Request, Response, NextFunction } from "express"
import {
  collectDefaultMetrics,
  Histogram,
  register,
  contentType,
} from "prom-client"

const enabled = process.env.METRICS_ENABLED !== "false"

let bootstrapped = false
let httpRequestDuration: Histogram<string> | null = null

function bootstrap(): void {
  if (!enabled || bootstrapped) return
  bootstrapped = true
  register.setDefaultLabels({
    service: process.env.METRICS_SERVICE_NAME || "swiftcab-api",
    pid: String(process.pid),
  })
  collectDefaultMetrics({ register })
  httpRequestDuration = new Histogram({
    name: "swiftcab_http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: ["method", "path", "status_code"],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
    registers: [register],
  })
}

function pathLabel(req: Request): string {
  if (req.route?.path) {
    const base = req.baseUrl || ""
    return `${base}${req.route.path}` || req.path
  }
  return req.path || "unknown"
}

export function prometheusMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!enabled) {
    next()
    return
  }
  if (req.path === "/metrics") {
    next()
    return
  }
  bootstrap()
  const start = process.hrtime.bigint()
  res.on("finish", () => {
    try {
      if (!httpRequestDuration) return
      const seconds = Number(process.hrtime.bigint() - start) / 1e9
      httpRequestDuration
        .labels(req.method, pathLabel(req), String(res.statusCode))
        .observe(seconds)
    } catch {
      // ignore metric errors
    }
  })
  next()
}

export async function metricsHandler(
  _req: Request,
  res: Response
): Promise<void> {
  if (!enabled) {
    res.status(404).end()
    return
  }
  bootstrap()
  res.setHeader("Content-Type", contentType)
  res.end(await register.metrics())
}
