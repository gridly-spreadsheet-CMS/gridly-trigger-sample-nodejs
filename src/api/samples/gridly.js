"use strict";

const config = require("../../config");
const gridlyClient = require("core/services/gridly")({
  apiKey: config.GRIDLY_API_KEY
});

module.exports = {
  path: "/gridly",
  method: "GET",
  meta: {
    friendlyName: "Gridly Records",
    description: "Sample of how to get Gridly record list."
  },
  handler: async ({ res }) => {
    const records = await gridlyClient.records("YOUR_VIEW_ID").get();

    return res.ok({
      data: records,
      message: "SUCCESS"
    });
  }
};
