const chalk = require('chalk');
const pkg = require('./package.json');

const sp = require("./tools/sp/strokesplus");
 
module.exports = {  
  context: [
    {
      name: "sp",
      module: "./tools/sp/strokesplus.js"
    },
    {
      name: "cwd",
      value: process.cwd()
    }
  ],
  banner: (context, pkg) => {
    console.log(chalk.bold(`StrokesPlus CLI ${pkg.version}.`));
    console.log(chalk.cyan('The `sp()` function will execute within the context\nof the StrokesPlus Script Engine.'));
  },
  prompt: "s+ > "
}