const fs = require("fs");
const path = require("path");

const app = require("../lib/StrokesPlusDotnet");

const { onCreateOrUpdate, raw } = require("../lib");

async function onFileCreateOrUpdate(output) {
  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("to write a TypeScript Declaration file");

  onCreateOrUpdate(output, async (path) => {
    console.log(`Wrote to ${path}`);
  });

  const input = raw(require.resolve("./DtsFromGetMethods"));
  const generatorArg = raw(output);
  const script = `eval(File.ReadAllText(${input}))(${generatorArg});`;

  app.runScript(script); //async
}

const outputDts = path.join(__dirname, "output.d.ts");
onFileCreateOrUpdate(outputDts);
