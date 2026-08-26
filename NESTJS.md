# NestJS notes — swc-api

See the primary service guide: **[README.md](./README.md)**.

## Bootstrap

- Entry: `src/main.ts` (`nest-cli.json` → `entryFile: main`)
- Express mount: `bootstrap/create-express-app.ts`
- Compatibility: `src/server.ts` → `import "./main"`

## InfraModule

Imported globally from `app.module.ts`:

```
infra/
  consul/     ConsulService + ConsulModule
  redis/      RedisService + RedisModule
  kafka/      KafkaService + KafkaModule
  mesh/       MeshHttpService + ConnectivityController
  infra.module.ts
```

Connectivity: `GET /nest/connectivity`

## Platform docs

- [Architecture](../docs/ARCHITECTURE.md)
- [Env vars](../docs/ENV.md)
- [Local dev](../docs/LOCAL_DEV.md)
