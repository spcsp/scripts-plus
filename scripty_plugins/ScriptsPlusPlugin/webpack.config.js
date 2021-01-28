const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'Properties'),
    filename: 'ScriptsPlus.js',
    library: '$',
    libraryTarget: 'this',
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          keep_fnames: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};