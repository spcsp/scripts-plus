const { resolve } = require('path');
const { match } = require('minta');

const sp = require("./strokesplus");
const [,,firstParam] = process.argv;

const fileExtRegex = /\.sp\.?js$/;

function exit(reason) {
  console.error(reason);
  process.exitCode = 1;
}

function execFile(filepath) {
  if (filepath) {
    const absPath = resolve(process.cwd(), filepath);
    
    return sp.exec(absPath);
  }
}

match(firstParam) (
  'reload',     _ => sp("sp.Reload()"),
  fileExtRegex, f => execFile(f),
  otherwise       => exit("+ Strokes Plus CLI +\nThis tool can be used to run script files through the StrokesPlus Script Engine,\nAs well as a few other goodies thrown in.\nTry `cli.cmd reload`")
);
