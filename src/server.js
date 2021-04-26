#!/usr/bin/env node

"use strict";

const koa = require("koa");
const koadocs = require("koa-docs");
const convert = require("koa-convert");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const errorHandler = require("core/middlewares/errorHandler");
const requestId = require("core/middlewares/requestId");
const responseHandler = require("core/middlewares/responseHandler");

const pkg = require("../package.json");

const config = require("./config");
const docs = require("./config/docs");
const { createRoutes } = require("./config/routes");
const allApis = require("./api");

const app = new koa();

app.proxy = true;
app.use(
  bodyParser({
    enableTypes: ["json", "form"],
    formLimit: "10mb",
    jsonLimit: "10mb"
  })
);
app.use(requestId());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    exposeHeaders: ["X-Request-Id"]
  })
);
app.use(responseHandler());
app.use(errorHandler());

// Create routers for all handlers implemented at src/handlers
const routers = createRoutes(config.appPrefix, allApis);

routers.forEach(route => app.use(route.middleware()));

// Load document
app.use(
  convert(koadocs.get(`${config.appPrefix}/docs`, docs(routers, pkg.version)))
);

// Handle uncaught errors
function onError(err, ctx) {
  if (!ctx) {
    console.log("Unhandled exception occured");
  } else {
    if (ctx.res.fail) {
      return ctx.res.fail(err);
    }

    return ctx.res;
  }
}
app.on("error", onError);

module.exports = app;
