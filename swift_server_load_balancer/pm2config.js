
const dotenv = require("dotenv");
const path = require("path");
module.exports = {
  dev: [
    {
      script: "dev",
      base: "swift-api-dev-server",
    },
  ],

   prod: [
    {
      script: "prod",
      base: "swift-api-prod-server",
    },
  ],

   stage: [
    {
      script: "pm2:server:stage",
      base: "swift-api-stage-server",
    },
  ],

 
};