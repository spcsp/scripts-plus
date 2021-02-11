const fs = require("fs");
const path = require("path");
const parseJson = require('parse-json');
const { prettyPrintJson } = require('pretty-print-json');

const app = require("../../src/node/StrokesPlusDotnet");
const { onCreateOrUpdate, raw, readFile, safeWrite } = require("../lib");

const input = require.resolve("./JsonFromGetMethods");
const output = path.join(__dirname, "output.json");
const htmlFile = path.join(__dirname, "Methods.html");
const templateFile = path.join(__dirname, "Methods.template.html");

(async () => {  
  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("to write JSON schema for the methods' signatures");

  onCreateOrUpdate(output, async (path) => {
    const contents = await readFile(output);
    
    try {
      parseJson(contents, output);
      const data = JSON.parse(contents);
            
      await safeWrite(path, JSON.stringify(data));
      console.log(`Wrote ${path}`);
      
      const html = prettyPrintJson.toHtml(data);
      const template = await readFile(templateFile);
      await safeWrite(htmlFile, template.replace("HTML_SOURCE", html));
      console.log(`Wrote ${htmlFile}`);
    } catch (err) {
      throw Error(err);
    }
  });

  app.runScript(`eval(File.ReadAllText(${raw(input)}))(${raw(output)});`);
})();
