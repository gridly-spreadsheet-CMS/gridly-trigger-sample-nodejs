"use strict";

const { executeTask } = require("core/tasks/taskManager");

module.exports = {
  path: "/long-task",
  method: "GET",
  meta: {
    friendlyName: "Task",
    description: "Sample for running long computation with task",
  },
  handler: ({ res }) => {
    executeTask({
      taskId: "_test", // Optinal, taskId should be built follow a certain rule so that it's used to recognize there's a same task has already added and still in progress
      // , then our flow will use this new task and cancel the previous added task.
      // ex: `${updated_record_id}_${updated_column_id}` used to recognize the change on the same cell.

      params: 10999999999, // Parameters for the executer
      executer: "sample_long_counter", // Name of the module exported in src/task_executers. This executer will be run on another machine process.
      onExecuted: ({ params, result }) => {
        // Add the code to handle the result of the executer here,
        // E.g update the result back to Gridly
        console.log(`!!! FINISH: ${params} ${result}`);
      },
    });

    return res.ok({
      data: { result: "SUCCESS" },
      message: "Hello, I'm in progress... You'll receive the result soon.",
    });
  },
};
