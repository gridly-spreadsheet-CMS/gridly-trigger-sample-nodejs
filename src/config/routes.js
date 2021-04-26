"use strict";
const Router = require("koa-joi-router");

const routeApi = (appPrefix, { meta, ...controller }) => {
  const router = Router();
  router.meta = {
    ...meta,
    prefix: `${appPrefix}${meta.prefix ? meta.prefix : ""}`
  };
  if (router.meta.prefix) {
    router.prefix(router.meta.prefix);
  }

  const actions = Object.values(controller);
  if (actions.length) {
    actions.forEach(({ path, method, meta, validate, handler }) => {
      router.route({
        path,
        method,
        meta,
        validate,
        handler
      });
    });
  }
  return router;
};

const createRoutes = (appPrefix, apis) => {
  return Object.entries(apis).reduce((routes, [api, controller]) => {
    routes.push(routeApi(appPrefix, controller));
    return routes;
  }, []);
};

module.exports = {
  createRoutes
};
