
import all_env  from "../../config/dotenv";

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
  return `${base}${p}`;
}

function baseForBo(): string {
  return all_env.API_GATEWAY_BASE_URL || all_env.BO_SERVICE_BASE_URL;
}

function baseForPayment(): string {
  return all_env.API_GATEWAY_BASE_URL || all_env.PAYMENT_SERVICE_BASE_URL;
}

export type InterServiceTarget = "bo" | "payment";

export function resolveOutboundBase(target: InterServiceTarget): string {
  return target === "bo" ? baseForBo() : baseForPayment();
}

export type InterServiceRequestOptions = RequestInit & {
  /** Serialized as JSON; sets Content-Type when body is not already set */
  json?: unknown;
  timeoutMs?: number;
};

/**
 * HTTP call to another SwiftCab service. Use gateway paths when `API_GATEWAY_BASE_URL` is set:
 * - BO: `/v1/auth/...`, `/v1/driver/...`, etc.
 * - Payment: `/v1/payment/...`
 */
export async function interServiceRequest(
  target: InterServiceTarget,
  path: string,
  options: InterServiceRequestOptions = {}
): Promise<Response> {
  const base = resolveOutboundBase(target);
  const url = joinUrl(base, path);
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
    return await fetch(url, {
      ...options,
      headers,
      body,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(id);
  }
}

export async function interServiceJson<T>(
  target: InterServiceTarget,
  path: string,
  options: InterServiceRequestOptions = {}
): Promise<T> {
  const res = await interServiceRequest(target, path, options);
  const text = await res.text();
  if (!res.ok) {
    throw new InterServiceHttpError(
      `Inter-service ${target} ${path} failed: ${res.status}`,
      res.status,
      text
    );
  }
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new InterServiceHttpError(
      `Inter-service ${target} ${path}: response is not JSON`,
      res.status,
      text
    );
  }
}
