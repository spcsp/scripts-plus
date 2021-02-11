const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const chokidar = require("chokidar");

const node = require("../../src/node");

const outputDts = path.join(__dirname, "output.d.ts");
const watcher = chokidar.watch(outputDts, { persistent: true });
const fileExists = async (fp) => {
  try {
    const stat = await fs.promises.stat(fp);
    return true;
  } catch (err) {
    return false;
  }
};

async function onFileCreateOrUpdate(outputFilepath) {
  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("to write a TypeScript Declaration file");

  const eventToWatch = (await fileExists(outputFilepath)) ? "change" : "add";

  watcher.on(eventToWatch, async (path) => {
    await watcher.close();

    console.log(`Wrote to ${outputFilepath}`);
  });

  const input = node.raw(require.resolve("./DtsFromGetMethods"));
  const generatorArg = node.raw(outputDts);
  const script = `eval(File.ReadAllText(${input}))(${generatorArg});`;

  node.StrokesPlusDotnet.runScript(script); //async
}

onFileCreateOrUpdate(outputDts);
