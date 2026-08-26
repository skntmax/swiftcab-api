import { stripTrailingSlash } from "./constant";


const  all_env =  {
   NODE_ENV: process.env.NODE_ENV , 
   PORT:process.env.PORT,
   VERSION:process.env.VERSION,
   DATABASE_URL:process.env.DATABASE_URL,
   REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
   REDIS_PORT: Number(process.env.REDIS_PORT) ,
   REDIS_PASSWORD: (process.env.REDIS_PASSWORD || "") as string ,
   KAFKA_HOST: (process.env.KAFKA_HOST || "") as string,
   KAFKA_CLOUD: process.env.KAFKA_CLOUD === "true",
   KAFKA_ENABLED: process.env.KAFKA_ENABLED !== "false",
   CONSUL_HTTP_ADDR: process.env.CONSUL_HTTP_ADDR || "http://127.0.0.1:8500",
   CONSUL_ENABLED: process.env.CONSUL_ENABLED !== "false",
   CONSUL_SERVICE_NAME: process.env.CONSUL_SERVICE_NAME || "swc-api",
   CONSUL_MESH_HTTP: process.env.CONSUL_MESH_HTTP !== "false",
   SECRET_KEY:process.env.SECRET_KEY as string,
   CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME as string,
   CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY as string,
   CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET as string,
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string, 
   S3_BUCKET_NAME:process.env.S3_BUCKET_NAME as string, 
   S3_REGION:process.env.S3_REGION as string, 
   S3_ACCCESS_KEY:process.env.S3_ACCCESS_KEY as string , 
   S3_SECRET_KEY:process.env.S3_SECRET_KEY as string, 
   S3_BASE_PATH:process.env.S3_BASE_PATH as string, 
   SECURITY_ENCRYPTION_ENABLED:process.env.SECURITY_ENCRYPTION_ENABLED as string,
   MULTI_CORE:process.env.MULTI_CORE as string,


   CONTEXT_PATH: (() => {
        let raw = (process.env.CONTEXT_PATH ?? "medium").trim();
        if (!raw) raw = "medium";
        return raw.startsWith("/") ? raw : `/${raw}`;
    })(),
    /**
     * When set, outbound calls to BO and payment use this host (Express Gateway, port 9000 in dev).
     * Paths must match gateway apiEndpoints (e.g. `/v1/auth/...`, `/v1/payment/...`).
     */
    API_GATEWAY_BASE_URL: (() => {
        const u = process.env.API_GATEWAY_BASE_URL?.trim();
        return u ? stripTrailingSlash(u) : "";
    })(),
    /** Direct BO base when `API_GATEWAY_BASE_URL` is empty (e.g. http://localhost:5000) */
    BO_SERVICE_BASE_URL: (() => {
        const u = (process.env.BO_SERVICE_BASE_URL ?? "http://localhost:5000").trim();
        return stripTrailingSlash(u);
    })(),
    /** Direct payment base when `API_GATEWAY_BASE_URL` is empty (e.g. http://localhost:7860) */
    PAYMENT_SERVICE_BASE_URL: (() => {
        const u = (process.env.PAYMENT_SERVICE_BASE_URL ?? "http://localhost:7860").trim();
        return stripTrailingSlash(u);
    })(),
    /** Public base for this medium service (for docs / callbacks); e.g. gateway `http://localhost:9000/medium` or direct `http://localhost:7001/medium` */
    MEDIUM_PUBLIC_BASE_URL: (() => {
        const u = process.env.MEDIUM_PUBLIC_BASE_URL?.trim();
        return u ? stripTrailingSlash(u) : "";
    })(),
    SERVICE_HTTP_TIMEOUT_MS: (() => {
        const n = Number(process.env.SERVICE_HTTP_TIMEOUT_MS);
        return Number.isFinite(n) && n > 0 ? n : 15_000;
    })(),
    /** Optional Bearer token for gateway policies (key-auth, etc.) */
    INTERSERVICE_AUTH_TOKEN: (process.env.INTERSERVICE_AUTH_TOKEN ?? "").trim(),
    KAFKA_RECOVERY_RETRY_DELAY_MS: (() => {
        const n = Number(process.env.KAFKA_RECOVERY_RETRY_DELAY_MS);
        return Number.isFinite(n) && n >= 0 ? n : 5000;
    })(),
    KAFKA_RECOVERY_MAX_ATTEMPTS: (() => {
        const n = Number(process.env.KAFKA_RECOVERY_MAX_ATTEMPTS);
        return Number.isFinite(n) && n >= 1 ? n : 5;
    })(),
}

console.log(all_env)

export default all_env