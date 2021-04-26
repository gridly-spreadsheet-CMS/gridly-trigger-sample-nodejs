"use strict";

const meta = {
  tags: "hooks",
  description: "Hooks to handle record changes from Gridly",
  prefix: "/hooks",
};

const textToAudio = require("./textToAudio");

module.exports = {
  meta,
  textToAudio,
};
