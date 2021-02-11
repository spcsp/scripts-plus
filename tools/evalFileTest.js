const app = require("../src/node/StrokesPlusDotnet");

const testFile = require.resolve("./testFile");

/**
 * Running a `.js` file through the S+ engine
 */
app.evalFile(testFile);
