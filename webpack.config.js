const path = require('path');
const HookShellScriptPlugin = require('hook-shell-script-webpack-plugin');

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
    new HookShellScriptPlugin({
      afterEmit: [
        'npm run compile',
        'npm run reload',
        'npm run hello'
      ]
    })
  ],
  resolve: {
    fallback: { 
      fs: false,
      path: false,
      util: false
    }
  },
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