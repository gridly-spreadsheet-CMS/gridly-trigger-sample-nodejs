"use strict";

const meta = {
  tags: "Samples",
  description: "Sample APIs",
  prefix: "/samples",
};

const LongTask = require("./longTask");
const Gridly = require("./gridly");

module.exports = {
  meta,
  Gridly,
  LongTask,
};
