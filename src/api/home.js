"use strict";

const pkginfo = require("../../package.json");

const meta = {
  tags: "Home",
  description: "APIs information"
};

const handler = {
  path: "/",
  method: "GET",
  meta: {
    friendlyName: "Gridly trigger sample NodeJS",
    description:
      "Project boilerplate in NodeJS, sample for how to implement hook to handle trigger changes from Gridly"
  },
  handler: async ({ res }) => {
    const data = {
      name: pkginfo.name,
      version: pkginfo.version,
      description: pkginfo.description,
      author: pkginfo.author
    };

    return res.ok({
      data,
      message:
        "I'm a sample for how to handle trigger changes from Gridly."
    });
  }
};

module.exports = {
  meta,
  handler
};
