const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const propsPath = path.resolve(__dirname, 'Properties');

const optimization = {
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
  };

module.exports = [
  {
    entry: './index.js',
    output: {
      path: propsPath,
      filename: 'vue.js'
    }
  },
  {
    entry: './main.js',
    output: {
      path: propsPath,
      filename: 'ScriptsPlus.js',
      library: '$',
      libraryTarget: 'this'
    },
    optimization
  }
];