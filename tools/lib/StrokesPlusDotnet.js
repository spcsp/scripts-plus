const execa = require("execa");

const e = s => "eval(" + s + ")";
const r = s => "String.raw`" + s + "`";
const read = s => "File.ReadAllText(" + s + ")";

class StrokesPlusDotnet {
  static EXE_PATH = String.raw`"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe"`;

  constructor() {}

  notify(msg) {
    this.eval(`sp.ShowBalloonTip("StrokesPlusDotnet", "${msg}", "Info", 5000)`);
  }

  runScript(src) {
    return execa(StrokesPlusDotnet.EXE_PATH, [`--script=${src}`]);
  }

  eval(evalSrc) {
    this.runScript(`eval(${evalSrc})`);
  }

  evalFile(input) {
    const evalSrc = `File.ReadAllText(${r(input)})`;

    this.runScript(`eval(${evalSrc})`);
  }

  readAndWrite(input, output) {
    const evalSrc = `File.ReadAllText(${r(input)})`;

    this.runScript(`eval(${evalSrc})(${r(output)});`);
  }
}

module.exports = new StrokesPlusDotnet();
