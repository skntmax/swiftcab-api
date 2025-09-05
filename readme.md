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


 <!-- for backup >  psql  -h localhost -p 5432 -U postgres swc < ./29june.sql  -->
 copy from local to server >  scp 29june.sql  sknt@164.52.219.98:/home/sknt/29june.sql


 <!-- for deleting history of git environment  -->
 python git-filter-repo.py --path .env.development --path .env.production --path .env.qa --invert-paths



 <!-- delete all the process on these particular ports  -->

 for port in 5001 7001 7002 7005; do
  pid=$(lsof -t -i:$port -sTCP:LISTEN)
  if [ -n "$pid" ]; then
    echo "Killing process on port $port (PID: $pid)"
    kill -9 $pid
  else
    echo "No process running on port $port"
  fi
done


certbot :
If you want HTTPS with Let's Encrypt:

Install Certbot:

bash
Copy
Edit
sudo apt install certbot python3-certbot-nginx
Run:

bash
Copy
Edit
sudo certbot --nginx -d swiftcab-api.365itsolution.com
Let me know if you'd like to auto-redirect HTTP to HTTPS too.


<!-- delete process at some port in windows  -->
netstat -ano | findstr :5000
taskkill /PID 12345 /F