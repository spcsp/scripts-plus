const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const chokidar = require("chokidar");

const app = require("../../src/node/StrokesPlusDotnet");
const { raw } = require("../../src/node");

const input = require.resolve("./JsonFromGetMethods");
const output = path.join(__dirname, "output.json");
    
const watcher = chokidar.watch(output, { persistent: true });

(async () => {
  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("to write JSON schema for the methods' signatures");

  const stat = await fs.promises.stat(output);
  const eventToWatch = stat ? 'change' : 'add';
  
  watcher.on(eventToWatch, async path => {
    await watcher.close();
        
    const contents = await fs.promises.readFile(input);
    const prettyJson = JSON.stringify(contents, null, 2);
    
    await fs.promises.writeFile(output, prettyJson);  
    console.log(`Wrote to ${output}`);
  });
   
  app.runScript(`eval(File.ReadAllText(${raw(input)}))(${raw(output)});`); //async
})();
