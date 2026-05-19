import pmClient from "prom-client";
import { Request, Response, NextFunction } from "express";

export const register = new pmClient.Registry();
pmClient.collectDefaultMetrics({ register });

const labelNames = ["method", "route", "status_code"] as const;

export const httpRequestsTotal = new pmClient.Counter({
    name: "swiftcab_http_requests_total",
    help: "Total HTTP requests handled by this service",
    labelNames: [...labelNames],
    registers: [register],
});

export const httpRequestDurationSeconds = new pmClient.Histogram({
    name: "swiftcab_http_request_duration_seconds",
    help: "HTTP request duration in seconds",
    labelNames: [...labelNames],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    registers: [register],
});

export const httpRequestsInFlight = new pmClient.Gauge({
    name: "swiftcab_http_requests_in_flight",
    help: "HTTP requests currently being processed",
    registers: [register],
});

export const httpRequestSizeBytes = new pmClient.Histogram({
    name: "swiftcab_http_request_size_bytes",
    help: "Incoming request body size in bytes (from Content-Length)",
    labelNames: ["method", "route"],
    buckets: [100, 500, 1_000, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000],
    registers: [register],
});

export const httpResponseSizeBytes = new pmClient.Histogram({
    name: "swiftcab_http_response_size_bytes",
    help: "Outgoing response body size in bytes (from Content-Length)",
    labelNames: [...labelNames],
    buckets: [100, 500, 1_000, 5_000, 10_000, 50_000, 100_000, 500_000, 1_000_000],
    registers: [register],
});

function getRouteLabel(req: Request): string {
    if (req.route?.path) {
        const base = req.baseUrl || "";
        const routePath =
            typeof req.route.path === "string"
                ? req.route.path
                : String(req.route.path);
        return `${base}${routePath}`;
    }
    const base = req.baseUrl || "";
    return base ? `${base}${req.path}` : req.path || "unknown";
}

function parseContentLength(value: string | undefined): number {
    if (!value) return 0;
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function httpMetricsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (req.path === "/metrics") {
        next();
        return;
    }

    httpRequestsInFlight.inc();
    const start = process.hrtime.bigint();
    const requestSize = parseContentLength(req.get("content-length"));

    let recorded = false;
    const recordMetrics = () => {
        if (recorded) return;
        recorded = true;
        httpRequestsInFlight.dec();

        const route = getRouteLabel(req);
        const method = req.method;
        const status_code = String(res.statusCode);
        const labels = { method, route, status_code };

        httpRequestsTotal.inc(labels);

        const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
        httpRequestDurationSeconds.observe(labels, durationSec);

        if (requestSize > 0) {
            httpRequestSizeBytes.observe({ method, route }, requestSize);
        }

        const responseSize = parseContentLength(res.get("content-length"));
        if (responseSize > 0) {
            httpResponseSizeBytes.observe(labels, responseSize);
        }
    };

    res.on("finish", recordMetrics);
    res.on("close", () => {
        if (!res.writableEnded) {
            recordMetrics();
        }
    });

    next();
}
