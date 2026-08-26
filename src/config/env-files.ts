import path from "path";

/** Nest ConfigModule paths: service .env first, shared mesh last (fills gaps). */
export function nestEnvFilePaths(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { nestEnvFilePaths: resolve } = require(path.resolve(
    process.cwd(),
    "..",
    "env",
    "resolve.cjs",
  )) as { nestEnvFilePaths: (paths: string[]) => string[] };

  const suffix =
    process.env.NODE_ENV === "PROD"
      ? "production"
      : process.env.NODE_ENV === "QA"
        ? "qa"
        : "development";

  return resolve([`.env.${suffix}`, ".env"]);
}
