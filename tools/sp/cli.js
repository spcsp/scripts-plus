const { resolve } = require('path');
const { match } = require('minta');

const sp = require("./strokesplus");
const [,,firstParam] = process.argv;

const fileExtRegex = /\.sp\.?js$/;

function exit(reason) {
  console.error(reason);
  process.exitCode = 1;
}

(async () => {
  match(firstParam) (
    'reload', _ => sp.reload(),
    fileExtRegex, f => {
      const absPath = resolve(process.cwd(), f);
      return sp.execFile(absPath);
    },
    otherwise => exit("+ Strokes Plus CLI +\nThis tool can be used to run script files through the StrokesPlus Script Engine,\nAs well as a few other goodies thrown in.\nTry `cli.cmd reload`")
  );
})();
