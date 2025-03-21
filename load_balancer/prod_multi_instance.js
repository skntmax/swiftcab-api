const { exec } = require("child_process");
const dotenv = require("dotenv");
const path = require("path");
const os = require("os");

// Load environment variables from .env.development
dotenv.config({ path: path.resolve(__dirname, "./../.env.production") });


// Detect OS type
const isWindows = os.platform() === "win32";

const ports = [ 7001 , 7002, 7003 , 7004 , 7005 ];

exec('npx tsc', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error generating production build`, error.message);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Stderr generating production build `, stderr);
    return;
  }

  console.log(`✅ Error production build generated `, stdout);
})



ports.forEach((port) => {
  const command = isWindows
    ? `set PORT=${port} && cross-env NODE_ENV=PROD nodemon ./src/server.ts  `
    : `PORT=${port} pm2 start 'cross-env NODE_ENV=PROD node ./dist/server.js'  --name "swiftcab-prod-api-${port}" `;


    console.log("command>>>" ,command)
  console.log(`Starting server on port ${port}...`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error starting on port ${port}:`, error.message);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Stderr on port ${port}:`, stderr);
      return;
    }

    console.log(`✅ Started on port ${port}:`, stdout);
  });
});
