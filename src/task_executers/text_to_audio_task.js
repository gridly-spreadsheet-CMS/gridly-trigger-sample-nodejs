const fs = require("fs");

const config = require("../config");
const { textToAudio } = require("../utils/textToSpeech");

const gridlyClient = require("core/services/gridly")({
  apiKey: config.GRIDLY_API_KEY
});

module.exports = async ({ viewId, recordId, columnId, text }) => {
  const audioPath = await textToAudio(text);

  await gridlyClient.records(viewId).update([
    {
      id: recordId,
      cells: [
        {
          columnId: columnId,
          value: []
        }
      ]
    }
  ]);

  await gridlyClient.records(viewId).upload(audioPath, recordId, columnId);
  await fs.unlinkSync(audioPath);

  return audioPath;
};
