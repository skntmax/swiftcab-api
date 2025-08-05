const { exec } = require("child_process");
const dotenv = require("dotenv");
const path = require("path");
const os = require("os");

// Load environment variables from .env.development
dotenv.config({ path: path.resolve(__dirname, "./../.env.development") });


// Detect OS type
const isWindows = os.platform() === "win32";

const ports = [6001, 6002, 6003 , 6004 , 6005 ];

ports.forEach((port) => {
  const command = isWindows
    ? `set PORT=${port} && cross-env NODE_ENV=DEV nodemon ./src/server.ts  `
    : `PORT=${port} pm2 start 'npm run dev' --name "swiftcab-dev-api-${port}" `;


    console.log("command>>>" ,command)
  console.log(`Starting server on 
port ${port}...`);

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