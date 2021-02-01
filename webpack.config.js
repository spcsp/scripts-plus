const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'Properties'),
    filename: 'ScriptsPlus.js',
    library: '$',
    libraryTarget: 'var'
  },
  externals: {
    clr: "clr"
  },
  resolve: { 
    extensions: [".js"],
    modules: [
      path.resolve(__dirname, 'src'),      
     'node_modules'
    ],
    fallback: {
      fs: "empty",
      path: "empty"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};