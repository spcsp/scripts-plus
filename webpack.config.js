const path = require("path");

const fromHere = p => path.resolve(__dirname, p);

module.exports = {
  entry: fromHere("src/index.js"),
  mode: "development",
  devtool: false,
  node: {
    __dirname: false
  },
  watchOptions: {
    poll: 1000
  },
  output: {
    path: fromHere("dist"),
    filename: "scripts-plus.js",
    library: "ScriptsPlus",
    libraryTarget: "var"
  },
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
          loader: "babel-loader"
        }
      }
    ]
  }
};

/*
,
    new HookShellScriptPlugin({
      afterEmit: ['npm run compile']
    }),
    new HookShellScriptPlugin({
      afterEmit: ['npm run reload-sp']
    })
    
    */
