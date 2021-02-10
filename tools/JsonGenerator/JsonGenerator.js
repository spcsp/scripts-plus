const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const app = require("../../src/node/StrokesPlusDotnet");
const { raw } = require("../../src/node");

const input = require.resolve("./JsonFromGetMethods");
const output = path.join(__dirname, "output.json");
    
const watcher = chokidar.watch(output, { persistent: true });

async function watchHandler(path) {
  //console.log(`File ${path} has been changed`);
  await watcher.close();
  console.log("Generation complete.");
}

(async () => {
  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("Writing to %s", output);

  const stat = await fs.promises.stat(output);
  
  if (stat) {
    watcher.on('change', watchHandler);
  } else {
    watcher.on('add', watchHandler);
  }
   
  app.runScript(`eval(File.ReadAllText(${raw(input)}))(${raw(output)});`); //async
})();