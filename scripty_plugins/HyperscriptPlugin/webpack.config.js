const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'Properties'),
    filename: 'h.js',
    library: 'h',
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