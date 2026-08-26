import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type ConsulServiceDefinition = {
  id: string;
  name: string;
  port: number;
  tags?: string[];
  meta?: Record<string, string>;
  healthHttp?: string;
  healthPath?: string;
  healthInterval?: string;
};

/**
 * Dynamic Consul registration: advertises this process's actual listen port.
 * Call `registerAfterListen(port)` from main.ts after `app.listen`.
 * Deregisters on shutdown when `enableShutdownHooks()` is set.
 */
@Injectable()
export class ConsulService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ConsulService.name);
  private registeredId: string | null = null;
  private enabled = false;
  private defaultPort = 5000;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.enabled = this.isEnabled();
    if (!this.enabled) {
      this.logger.warn("Consul registration disabled (CONSUL_ENABLED=false)");
      return;
    }
    this.logger.log(
      "Consul enabled â€” will register after HTTP listen with the real port",
    );
  }

  async onModuleDestroy() {
    if (this.registeredId) {
      await this.deregister(this.registeredId);
      this.registeredId = null;
    }
  }

  /** Register using the port the process actually bound (preferred). */
  async registerAfterListen(
    port: number,
    override?: Partial<ConsulServiceDefinition>,
  ): Promise<void> {
    this.enabled = this.isEnabled();
    if (!this.enabled) return;
    await this.register({ ...override, port });
  }

  get httpAddr(): string {
    return (
      this.config.get<string>("CONSUL_HTTP_ADDR") || "http://127.0.0.1:8500"
    ).replace(/\/+$/, "");
  }

  async register(override?: Partial<ConsulServiceDefinition>): Promise<void> {
    if (!this.isEnabled()) {
      this.enabled = false;
      return;
    }
    this.enabled = true;

    const name =
      override?.name ||
      this.config.get<string>("CONSUL_SERVICE_NAME") ||
      process.env.CONSUL_SERVICE_NAME ||
      "swc-api";

    const port = Number(
      override?.port ??
        this.config.get<string>("PORT") ??
        this.config.get<number>("port") ??
        this.defaultPort,
    );
    if (!Number.isFinite(port) || port <= 0) {
      this.logger.warn(`Consul register skipped: invalid port ${port}`);
      return;
    }

    // Catalog address used by peer apps. host.docker.internal works for
    // Docker Consul health checks and for host processes on Windows/macOS.
    const address =
      this.config.get<string>("CONSUL_SERVICE_ADDRESS") ||
      "host.docker.internal";
    const checkHost =
      this.config.get<string>("CONSUL_CHECK_HOST") || address;

    // Stable per name+port so restarts replace the same catalog entry.
    // Run a second instance on a different PORT to get another instance row.
    const id =
      override?.id ||
      this.config.get<string>("CONSUL_SERVICE_ID") ||
      process.env.CONSUL_SERVICE_ID ||
      `${name}-${port}`;

    const healthPath = (
      override?.healthPath ||
      this.config.get<string>("CONSUL_HEALTH_PATH") ||
      "/health"
    ).replace(/^(?!\/)/, "/");

    // Always derive check URL from the live port â€” never require a static port in env.
    const healthHttp =
      override?.healthHttp || `http://${checkHost}:${port}${healthPath}`;

    const body = {
      ID: id,
      Name: name,
      Address: address,
      Port: port,
      Tags:
        override?.tags ||
        (this.config.get<string>("CONSUL_SERVICE_TAGS") || "nestjs,http")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      Meta: {
        framework: "nestjs",
        pid: String(process.pid),
        listen_port: String(port),
        health_path: healthPath,
        ...(override?.meta || {}),
      },
      Check: {
        CheckID: `${id}-http`,
        Name: `${name} HTTP health`,
        HTTP: healthHttp,
        Method: "GET",
        Interval: override?.healthInterval || "10s",
        Timeout: "3s",
        DeregisterCriticalServiceAfter: "1m",
      },
    };

    try {
      const res = await fetch(`${this.httpAddr}/v1/agent/service/register`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
      this.registeredId = id;
      this.logger.log(
        `Consul registered ${name} as ${id} @ ${address}:${port} (check ${healthHttp})`,
      );
    } catch (err) {
      this.logger.warn(
        `Consul register skipped/failed: ${err instanceof Error ? err.message : err}`,
      );
    }
  }

  async deregister(id: string): Promise<void> {
    try {
      await fetch(`${this.httpAddr}/v1/agent/service/deregister/${id}`, {
        method: "PUT",
      });
      this.logger.log(`Consul deregistered ${id}`);
    } catch (err) {
      this.logger.warn(
        `Consul deregister failed: ${err instanceof Error ? err.message : err}`,
      );
    }
  }

  /** Resolve healthy instances for a service name from Consul catalog */
  async resolveService(
    serviceName: string,
  ): Promise<Array<{ address: string; port: number }>> {
    try {
      const res = await fetch(
        `${this.httpAddr}/v1/health/service/${encodeURIComponent(serviceName)}?passing=true`,
      );
      if (!res.ok) return [];
      const data = (await res.json()) as Array<{
        Service: { Address: string; Port: number };
      }>;
      return data.map((d) => ({
        address: d.Service.Address || "127.0.0.1",
        port: d.Service.Port,
      }));
    } catch {
      return [];
    }
  }

  async resolveBaseUrl(
    serviceName: string,
    fallbackUrl: string,
  ): Promise<string> {
    const instances = await this.resolveService(serviceName);
    if (!instances.length) return fallbackUrl.replace(/\/+$/, "");
    const pick = instances[Math.floor(Math.random() * instances.length)];
    // Prefer loopback for host-local mesh when Consul advertises docker DNS name
    const host =
      pick.address === "host.docker.internal" ? "127.0.0.1" : pick.address;
    return `http://${host}:${pick.port}`;
  }

  async status() {
    let leader: string | null = null;
    let reachable = false;
    try {
      const res = await fetch(`${this.httpAddr}/v1/status/leader`);
      leader = await res.text();
      reachable = res.ok;
    } catch {
      reachable = false;
    }
    return {
      enabled: this.enabled,
      httpAddr: this.httpAddr,
      reachable,
      leader,
      registeredId: this.registeredId,
    };
  }

  private isEnabled(): boolean {
    const v = this.config.get("CONSUL_ENABLED");
    if (v === false || v === "false" || v === 0 || v === "0") return false;
    return true;
  }
}

