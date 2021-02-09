const path = require("path");

const { raw } = require("../../src/node");
const app = require("../../src/node/StrokesPlusDotnet");

const input = raw(require.resolve("./TypescriptFromGetMethods"));
const output = raw(path.join(__dirname, "output.d.ts"));

app.runScript(`eval(File.ReadAllText(${input}))(${output});`);
