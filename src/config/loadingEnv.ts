import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { sharedMeshEnvPath } = require(path.resolve(
  process.cwd(),
  "..",
  "env",
  "resolve.cjs",
)) as { sharedMeshEnvPath: () => string | null };

const servicePath =
  process.env.NODE_ENV == "DEV"
    ? "./.env.development"
    : process.env.NODE_ENV == "PROD"
      ? "./.env.production"
      : "./.env.qa";

// Service first (wins), then shared mesh fills gaps only
dotenv.config({ path: servicePath });
const shared = sharedMeshEnvPath();
if (shared && fs.existsSync(shared)) {
  dotenv.config({ path: shared });
}
