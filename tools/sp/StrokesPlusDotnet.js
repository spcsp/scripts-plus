const execa = require("execa");

const raw = fp => "String.raw`" + fp + "`";

class StrokesPlusDotnet {
  static create(...args) {
    return new StrokesPlusDotnet(...args);
  }

  constructor(config = {}) {
    this.exePath = config.exePath || "C:\\Program Files\\StrokesPlus.net\\StrokesPlus.net.exe";
  }

  sp(fn) {
    return (...args) => this.exec(`sp["${fn}"]()`);    
  }

  async exec(src) {
    return execa(this.exePath, [`--script=${src}`]);
  }

  async eval(src) {
    this.exec(`eval(${src})`);
  }
  
  async evalFile(absPath) {    
    this.eval(`File.ReadAllText(${raw(absPath)})`);
  }

  async reload() {
    this.exec(`sp.Reload()`);
  }

  async settings() {
    this.exec(`sp.OpenSettings()`);
  }
  
  notify(msg) {
    this.exec(`sp.ShowBalloonTip("StrokesPlusDotnet", "${msg}", "Info", 5000)`);
  }
}

module.exports = new StrokesPlusDotnet();
