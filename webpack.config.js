const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const fromHere = p => path.resolve(__dirname, p);

module.exports = {
  entry: fromHere('src/index.js'),
  mode: 'development',
  devtool: false,
  node: {
    __dirname: false
  },
  output: {
    path: fromHere('Properties'),
    filename: 'ScriptsPlus.js',
    library: 'ScriptsPlus',
    libraryTarget: 'var'
  },
  plugins: [
    new WebpackShellPluginNext({
      onAfterDone: {
        scripts: [
          'compile.bat',
          'reload_s+.bat',
          'notify.bat'
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};