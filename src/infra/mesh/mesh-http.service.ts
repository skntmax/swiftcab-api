import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConsulService } from "../consul/consul.service";

export type MeshTarget = "api" | "payment" | "medium" | "gateway";

/**
 * Resolves inter-service base URLs via Consul catalog when available,
 * otherwise falls back to env (API_GATEWAY / direct service URLs).
 */
@Injectable()
export class MeshHttpService {
  private readonly logger = new Logger(MeshHttpService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly consul: ConsulService,
  ) {}

  private envFallback(target: MeshTarget): string {
    const gateway = (this.config.get<string>("API_GATEWAY_BASE_URL") || "")
      .trim()
      .replace(/\/+$/, "");
    if (gateway && target !== "gateway") return gateway;

    const map: Record<MeshTarget, string> = {
      api: this.config.get<string>("BO_SERVICE_BASE_URL") || "http://127.0.0.1:5000",
      payment:
        this.config.get<string>("PAYMENT_SERVICE_BASE_URL") ||
        "http://127.0.0.1:7860",
      medium:
        this.config.get<string>("MEDIUM_SERVICE_BASE_URL") ||
        "http://127.0.0.1:7001",
      gateway:
        this.config.get<string>("API_GATEWAY_BASE_URL") ||
        "http://127.0.0.1:9000",
    };
    return map[target].replace(/\/+$/, "");
  }

  private consulName(target: MeshTarget): string {
    const defaults: Record<MeshTarget, string> = {
      api: "swc-api",
      payment: "swc-payment",
      medium: "swc-medium",
      gateway: "swc-nest-gateway",
    };
    const envKey = {
      api: "CONSUL_NAME_API",
      payment: "CONSUL_NAME_PAYMENT",
      medium: "CONSUL_NAME_MEDIUM",
      gateway: "CONSUL_NAME_GATEWAY",
    }[target];
    return this.config.get<string>(envKey) || defaults[target];
  }

  async resolveBase(target: MeshTarget): Promise<string> {
    const useMesh = this.config.get<string>("CONSUL_MESH_HTTP") !== "false";
    const fallback = this.envFallback(target);
    if (!useMesh) return fallback;
    const url = await this.consul.resolveBaseUrl(
      this.consulName(target),
      fallback,
    );
    if (url !== fallback) {
      this.logger.debug(`Mesh resolved ${target} → ${url}`);
    }
    return url;
  }

  async request(
    target: MeshTarget,
    path: string,
    options: RequestInit & { json?: unknown; timeoutMs?: number } = {},
  ): Promise<Response> {
    const base = await this.resolveBase(target);
    const p = path.startsWith("/") ? path : `/${path}`;
    const url = `${base}${p}`;
    const timeoutMs =
      options.timeoutMs ??
      Number(this.config.get<string>("SERVICE_HTTP_TIMEOUT_MS") || 15000);

    const headers = new Headers(options.headers);
    const token = (this.config.get<string>("INTERSERVICE_AUTH_TOKEN") || "").trim();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    let body = options.body;
    if (options.json !== undefined) {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      body = JSON.stringify(options.json);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, {
        ...options,
        headers,
        body,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  async json<T>(
    target: MeshTarget,
    path: string,
    options: RequestInit & { json?: unknown; timeoutMs?: number } = {},
  ): Promise<T> {
    const res = await this.request(target, path, options);
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Mesh HTTP ${target} ${path} → ${res.status}: ${text}`);
    }
    return text ? (JSON.parse(text) as T) : (undefined as T);
  }
}
