import all_env from "../../config/dotenv";

export class InterServiceHttpError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "InterServiceHttpError";
    this.status = status;
    this.body = body;
  }
}

function joinUrl(base: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/+$/, "")}${p}`;
}

export type InterServiceTarget = "bo" | "payment" | "swc-payment";

const CONSUL_NAMES: Record<InterServiceTarget, string> = {
  bo: process.env.CONSUL_NAME_API || "swc-api",
  payment: process.env.CONSUL_NAME_PAYMENT || "swc-payment",
  "swc-payment": process.env.CONSUL_NAME_SWC_PAYMENT || "swc-payment",
};

function staticFallback(target: InterServiceTarget): string {
  // Prefer direct service URL for mesh peers; gateway only if explicitly wanted without Consul
  if (target === "bo") {
    return all_env.BO_SERVICE_BASE_URL || all_env.API_GATEWAY_BASE_URL;
  }
  return all_env.PAYMENT_SERVICE_BASE_URL || all_env.API_GATEWAY_BASE_URL;
}

/**
 * Resolve a healthy instance from Consul catalog.
 * Rewrites host.docker.internal → 127.0.0.1 for host-local Nest processes.
 */
async function resolveViaConsul(
  serviceName: string,
  fallback: string,
): Promise<{ baseUrl: string; source: "consul" | "fallback"; instances: number }> {
  const addr = (all_env.CONSUL_HTTP_ADDR || "http://127.0.0.1:8500").replace(
    /\/+$/,
    "",
  );
  try {
    const res = await fetch(
      `${addr}/v1/health/service/${encodeURIComponent(serviceName)}?passing=true`,
    );
    if (!res.ok) {
      return { baseUrl: fallback, source: "fallback", instances: 0 };
    }
    const data = (await res.json()) as Array<{
      Service: { Address: string; Port: number };
    }>;
    if (!data.length) {
      return { baseUrl: fallback, source: "fallback", instances: 0 };
    }
    const pick = data[Math.floor(Math.random() * data.length)];
    const host =
      pick.Service.Address === "host.docker.internal"
        ? "127.0.0.1"
        : pick.Service.Address || "127.0.0.1";
    return {
      baseUrl: `http://${host}:${pick.Service.Port}`,
      source: "consul",
      instances: data.length,
    };
  } catch {
    return { baseUrl: fallback, source: "fallback", instances: 0 };
  }
}

export async function resolveOutboundBase(
  target: InterServiceTarget,
): Promise<{ baseUrl: string; source: "consul" | "fallback" | "gateway"; instances: number }> {
  const fallback = staticFallback(target).replace(/\/+$/, "");

  // Consul mesh path (preferred)
  if (all_env.CONSUL_MESH_HTTP) {
    const resolved = await resolveViaConsul(CONSUL_NAMES[target], fallback);
    return resolved;
  }

  // Legacy: prefer gateway if configured
  if (all_env.API_GATEWAY_BASE_URL) {
    return {
      baseUrl: all_env.API_GATEWAY_BASE_URL,
      source: "gateway",
      instances: 0,
    };
  }

  return { baseUrl: fallback, source: "fallback", instances: 0 };
}

export type InterServiceRequestOptions = RequestInit & {
  /** Serialized as JSON; sets Content-Type when body is not already set */
  json?: unknown;
  timeoutMs?: number;
};

/**
 * HTTP call to another SwiftCab service.
 * With CONSUL_MESH_HTTP=true (default), host/port come from a healthy Consul instance.
 */
export async function interServiceRequest(
  target: InterServiceTarget,
  path: string,
  options: InterServiceRequestOptions = {},
): Promise<Response & { mesh?: { baseUrl: string; source: string; instances: number } }> {
  const resolved = await resolveOutboundBase(target);
  const url = joinUrl(resolved.baseUrl, path);
  const timeoutMs = options.timeoutMs ?? all_env.SERVICE_HTTP_TIMEOUT_MS;

  const headers = new Headers(options.headers);
  if (all_env.INTERSERVICE_AUTH_TOKEN && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${all_env.INTERSERVICE_AUTH_TOKEN}`);
  }

  let body = options.body;
  if (options.json !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    body = JSON.stringify(options.json);
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      body,
      signal: controller.signal,
    });
    (res as Response & { mesh?: unknown }).mesh = resolved;
    return res as Response & {
      mesh?: { baseUrl: string; source: string; instances: number };
    };
  } finally {
    clearTimeout(id);
  }
}

export async function interServiceJson<T>(
  target: InterServiceTarget,
  path: string,
  options: InterServiceRequestOptions = {},
): Promise<T> {
  const res = await interServiceRequest(target, path, options);
  const text = await res.text();
  if (!res.ok) {
    throw new InterServiceHttpError(
      `Inter-service ${target} ${path} failed: ${res.status} (via ${res.mesh?.source} ${res.mesh?.baseUrl})`,
      res.status,
      text,
    );
  }
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new InterServiceHttpError(
      `Inter-service ${target} ${path}: response is not JSON`,
      res.status,
      text,
    );
  }
}

/** Same as interServiceJson but also returns Consul resolution metadata */
export async function interServiceJsonWithMesh<T>(
  target: InterServiceTarget,
  path: string,
  options: InterServiceRequestOptions = {},
): Promise<{
  data: T;
  mesh: { baseUrl: string; source: string; instances: number };
}> {
  const res = await interServiceRequest(target, path, options);
  const text = await res.text();
  if (!res.ok) {
    throw new InterServiceHttpError(
      `Inter-service ${target} ${path} failed: ${res.status}`,
      res.status,
      text,
    );
  }
  const data = text ? (JSON.parse(text) as T) : (undefined as T);
  return {
    data,
    mesh: res.mesh || { baseUrl: "", source: "fallback", instances: 0 },
  };
}
