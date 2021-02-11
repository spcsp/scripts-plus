const fs = require("fs");
const path = require("path");
const parseJson = require('parse-json');
const { prettyPrintJson } = require('pretty-print-json');

const app = require("../../src/node/StrokesPlusDotnet");
const { onCreateOrUpdate, raw, readFile, safeWrite } = require("../lib");

const input = require.resolve("./JsonFromGetMethods");
const output = path.join(__dirname, "output.json");
const htmlFile = path.join(__dirname, "index.html");
const templateFile = path.join(__dirname, "template.html");

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
      
      // const html = prettyPrintJson.toHtml(data);
      
      let template = await readFile(templateFile);
      // template = template.replace("HTML_SOURCE", html)
      template = template.replace("__JSON_SOURCE__", JSON.stringify(data))
      
      await safeWrite(htmlFile, template);
      console.log(`Wrote ${htmlFile}`);
    } catch (err) {
      throw Error(err);
    }
  });

  app.runScript(`eval(File.ReadAllText(${raw(input)}))(${raw(output)});`);
})();
