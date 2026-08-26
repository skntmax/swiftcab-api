/**
 * Legacy entrypoint — delegates to NestJS bootstrap (src/main.ts).
 * PM2 / nodemon scripts that point at server.ts keep working unchanged.
 */
import "./main";

export { API_VERSION as version } from "./bootstrap/create-express-app";
