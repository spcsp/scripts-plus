const execa = require("execa");

const EXE_PATH = String.raw`"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe"`;

function runScript(src) {
  return execa(EXE_PATH, [`--script=${src}`]);
}

module.exports = {
  EXE_PATH,
  runScript,
};
