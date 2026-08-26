import { Logger } from "@nestjs/common";
import path from "path";

type PreloadResult = {
  ok: boolean;
  reason?: string;
  shared?: number;
  service?: number;
  error?: string;
};

/**
 * Nest-friendly wrapper around monorepo `env/vault-preload.cjs`.
 * Call once during bootstrap AFTER dotenv / mesh env are loaded.
 */
export async function loadVaultIntoProcessEnv(serviceName: string): Promise<PreloadResult> {
  const logger = new Logger("VaultPreload");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { preloadVaultSecrets } = require(path.resolve(
    process.cwd(),
    "..",
    "env",
    "vault-preload.cjs",
  )) as {
    preloadVaultSecrets: (opts: {
      serviceName: string;
      logger?: (m: string) => void;
    }) => Promise<PreloadResult>;
  };

  return preloadVaultSecrets({
    serviceName,
    logger: (m) => logger.log(m),
  });
}
