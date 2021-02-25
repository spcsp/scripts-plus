const path = require("path");
const app = require("../lib/StrokesPlusDotnet");

const input = require.resolve(process.argv[2]);
const output = path.join(__dirname, "help.json");

(async () => {
  console.log("INPUT", input);
  console.log("OUTPUT", output);

  app.readAndWrite(input, output);

  console.log("Parsing the contents of `sp.GetMethods`");
  console.log("to write JSON schema for the methods' signatures");

  onCreateOrUpdate(output, async (path) => {
    const contents = await readFile(output);

    try {
      parseJson(contents, output);
      const data = JSON.parse(contents);

      await writeFile(path, JSON.stringify(data));
      console.log(`Wrote ${path}`);
    } catch (err) {
      throw Error(err);
    }
  });

  app.runScript(`eval(File.ReadAllText(${raw(input)}))(${raw(output)});`);
})();
