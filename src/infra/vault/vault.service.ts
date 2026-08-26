import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * Optional runtime helper. Boot-time secrets should come from
 * `loadVaultIntoProcessEnv` / `env/vault-preload.cjs` before Nest builds config.
 */
@Injectable()
export class VaultService {
  private readonly logger = new Logger(VaultService.name);

  constructor(private readonly config: ConfigService) {}

  isEnabled(): boolean {
    return this.config.get<string>("VAULT_ENABLED") === "true";
  }

  status() {
    return {
      enabled: this.isEnabled(),
      addr: this.config.get<string>("VAULT_ADDR") || "http://127.0.0.1:8200",
      kvMount: this.config.get<string>("VAULT_KV_MOUNT") || "secret",
      secretEnv: this.config.get<string>("VAULT_SECRET_ENV") || "dev",
      tokenConfigured: Boolean(this.config.get<string>("VAULT_TOKEN")),
    };
  }

  logStatus(): void {
    if (!this.isEnabled()) {
      this.logger.log("Vault disabled (VAULT_ENABLED!=true)");
      return;
    }
    this.logger.log(`Vault ${JSON.stringify(this.status())}`);
  }
}
