const fs = require("fs");
const path = require("path");

const app = require("../../src/node/StrokesPlusDotnet");

const { onCreateOrUpdate, raw, safeWrite } = require("../lib");

const input = require.resolve("./JsonFromGetMethods");
const output = path.join(__dirname, "output.json");

(async () => {
  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("to write JSON schema for the methods' signatures");

  onCreateOrUpdate(output, async (path) => {
    const contents = await fs.promises.readFile(output, "utf8");
    const prettyJson = JSON.stringify(contents, null, 2);

    await safeWrite(path, prettyJson);

    console.log(`Wrote to ${path}`);
  });

  app.runScript(`eval(File.ReadAllText(${raw(input)}))(${raw(output)});`); //async
})();
