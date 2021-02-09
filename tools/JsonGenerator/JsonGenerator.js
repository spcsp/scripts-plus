const path = require("path");

const app = require("../../src/node/StrokesPlusDotnet");
const { raw } = require("../../src/node");

const input = raw(require.resolve("./JsonFromGetMethods"));
const output = raw(path.join(__dirname, "output.json"));

console.log("Input: %s", input);
console.log("Output: %s", output);

app.runScript(`eval(File.ReadAllText(${input}))(${output});`);
