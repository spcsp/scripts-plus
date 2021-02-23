const path = require("path");
const fromHere = (...args) => path.resolve(__dirname, ...args);

module.exports = {
  entry: fromHere("src", "index.js"),
  mode: "production",
  output: {
    path: fromHere("dist"),
    filename: "tsPattern.js",
    library: "tsPattern",
    libraryTarget: "var",
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
