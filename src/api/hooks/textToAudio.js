"use strict";

const { Joi } = require("koa-joi-router");
const { executeTask } = require("core/tasks/taskManager");

module.exports = {
  path: "/text-to-audio",
  method: "POST",
  meta: {
    friendlyName: "Text to Audio",
    description:
      "Receive a change from Gridly, convert the updated text to audio file then post audio file back to Gridly"
  },
  validate: {
    type: "json",
    body: {
      view_id: Joi.string().required(),
      input_column_id: Joi.string().required(),
      output_column_id: Joi.string().required(),
      data: Joi.any().required() // FIXME: when "Test rule" in Gridly, it should be in object as well, currently it's array.
    }
  },
  handler: async ({
    res,
    request: {
      body: { view_id, input_column_id, output_column_id, data }
    }
  }) => {
    const updatedData = data || {};
    const updatedRecords = updatedData.records || [];

    if (!updatedRecords.length) {
      return res.ok({
        data: {},
        message: "SUCCESS!!! Nothing to be updated."
      });
    }

    updatedRecords.forEach(updatedRecord => {
      const updatedCells = updatedRecord.cells || [];
      updatedCells.forEach(updatedCell => {
        if (updatedCell.columnId === input_column_id) {
          const uniqueId = `${updatedRecord.id}_${updatedCell.columnId}`;

          executeTask({
            taskId: uniqueId, // Optinal. An executing task have the same Id, not completed yet, will be canceled.
            params: {
              // parameters for executer
              viewId: view_id,
              recordId: updatedRecord.id,
              columnId: output_column_id,
              text: updatedCell.value
            },
            executer: "text_to_audio_task" // Name of the module exported at src/task_executers. This executer will be run in a new child process.
          });
        }
      });
    });

    return res.ok({
      data: {},
      message: "SUCCESS!!! I'm in progress...Will send you result soon."
    });
  }
};
