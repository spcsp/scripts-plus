const path = require("path");
const app = require("../lib/StrokesPlusDotnet");

const input = require.resolve(process.argv[2]);
const output = path.join(__dirname, "help.json");

console.log("INPUT", input);
console.log("OUTPUT", output);

app.readAndWrite(input, output);
