# swc-api

NestJS BO (back-office) API for SwiftCab. Express routers under `/v1/*` are preserved; Nest adds mesh, Redis, Kafka, and health endpoints.

**Consul name:** `swc-api` · **Default port:** `5000`

## Docs

| Doc | Content |
|-----|---------|
| This README | Overview, routes, scripts |
| [NESTJS.md](./NESTJS.md) | Nest layout + `InfraModule` |
| [.env.mesh.example](./.env.mesh.example) | Consul / Redis / Kafka sample env |
| [../docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) | Platform architecture |
| [../docs/ENV.md](../docs/ENV.md) | Shared env reference |
| [../docs/LOCAL_DEV.md](../docs/LOCAL_DEV.md) | Full local stack |

## Responsibilities

- Auth, owner, customer, driver, admin, master, test APIs  
- Prisma + Postgres  
- BullMQ (signup mail, OTP) on Redis  
- JWT middlewares, celebrate validation, optional AES body decrypt  
- Prometheus `/metrics`  

## Run

```bash
cd swc-api
# merge .env.mesh.example into .env.development (PORT=5000)
npm install
npm run dev          # nest start --watch
npm run build && npm run start:prod
```

Legacy: `src/server.ts` re-exports `main.ts` (PM2 / nodemon compatible).

## HTTP surface

| Path | Notes |
|------|--------|
| `/v1/auth/*` | Login, signup, OTP, roles |
| `/v1/owner/*` | Owner flows |
| `/v1/customer/*` | Customer flows |
| `/v1/driver/*` | Driver flows |
| `/v1/admin/*` | Admin |
| `/v1/master/*` | Master data |
| `/v1/test/*` | Status / seed helpers (`/v1/test/status`) |
| `/health` | Liveness |
| `/metrics` | Prometheus |
| `/nest/health` | Nest module health |
| `/nest/connectivity` | Consul + Redis + Kafka + mesh URLs |

## Infra (`src/infra/`)

| Module | Role |
|--------|------|
| `ConsulService` | Register as `swc-api`; resolve peers |
| `RedisService` | Nest ioredis (`REDIS_HOST` / `REDIS_PORT`) |
| `KafkaService` | Optional Nest producer |
| `MeshHttpService` | Call payment / medium / gateway via Consul or env |

Existing Redis (`services/redis`) and BullMQ workers remain for domain code.

## Key env

See `.env.mesh.example` and [docs/ENV.md](../docs/ENV.md). Critical: `PORT=5000`, `DATABASE_URL`, `REDIS_PORT`, `SECRET_KEY`, `CONSUL_*`, `KAFKA_HOST`.

## Layout

```
src/
  main.ts
  app.module.ts
  bootstrap/create-express-app.ts   # mounts Express routers
  infra/                            # Consul, Redis, Kafka, mesh
  modules/{auth,owner,...}/         # Nest domain shells
  routes|controller|services|...    # legacy Express domain
prisma/
```
