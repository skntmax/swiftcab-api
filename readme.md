npx dotenv -e .env.production -- npx prisma migrate deploy


2017  npm i -g cross-env
 2018  cross-env NODE_ENV=PROD  dotenv -e .env.production  -- npx prisma migrate deploy
 2019  dotenv -e .env.production -- cross-env NODE_ENV=production npx prisma migrate deploy
 2020  npm install --save-dev dotenv-cli
 2021  npm install -g dotenv-cli
 2022  npx dotenv -e .env.production -- npx prisma migrate deploy
 2023  npx dotenv -e .env.production -- prisma migrate status --schema=prisma/schema.prisma
 2024  npx dotenv -e .env.production --  prisma migrate resolve --applied 20250628214324_ok
 2025  npx dotenv -e .env.production --  npx prisma migrate deploy
 2026  history


 for backup >  psql  -h localhost -p 5432 -U postgres swc < ./29june.sql 

 copy from local to server >  scp 29june.sql  sknt@164.52.219.98:/home/sknt/29june.sql