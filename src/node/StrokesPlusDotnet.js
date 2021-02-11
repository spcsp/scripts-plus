const execa = require("execa");

const EXE_PATH = String.raw`"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe"`;

function runScript(src) {
  return execa(EXE_PATH, [`--script=${src}`]);
}

function evalFile(filepath) {
  runScript("eval(File.ReadAllText(String.raw`" + filepath + "`));");
}

module.exports = {
  EXE_PATH,
  evalFile,
  runScript,
};
