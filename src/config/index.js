"use strict";

const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || "development";
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || "gridly-sample-nodejs",
    host: process.env.APP_HOST || "localhost",
    port: process.env.PORT || 5000,
    appPrefix: "",
    database: {
      name: "",
      host: "",
      user: "",
      password: "",
      limit: 0
    },
    GRIDLY_API_KEY: process.env.GRIDLY_API_KEY
  },
  production: {},
  development: {},
  test: {
    port: 5001
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
