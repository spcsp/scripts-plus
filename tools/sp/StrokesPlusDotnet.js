const path = require("path");
const execa = require("execa");
const { match } = require("minta");
const { Select } = require("enquirer");

const raw = fp => "String.raw`" + fp + "`";

class StrokesPlusDotnet {
  static create(...args) {
    return new StrokesPlusDotnet(...args);
  }

  constructor(config = {}) {
    this.exePath = config.exePath || "C:\\Program Files\\StrokesPlus.net\\StrokesPlus.net.exe";
    this.tasks = [
      'reload',
      'settings'
    ];
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
  
  execLocalFile(file) {
    if (file.endsWith(/\.sp\.?js$/)) {
      const absPath = path.resolve(process.cwd(), file);
      
      return this.evalFile(absPath);
    } else {
      throw Error("+ Strokes Plus CLI +\nThis tool can be used to run script files through the StrokesPlus Script Engine,\nAs well as a few other goodies thrown in.\nTry `cli.cmd reload`")
    }
  }
  
  async cliTaskRunner() {
    const prompt = new Select({
      name: 'task',
      message: 'Select a task',
      choices: this.tasks
    });

    const task = await prompt.run();
          
    if (task === "reload") {
      this.reload();
    }
    
    if (task === "settings") {
      this.settings();
    }
  }
}

module.exports = { 
  StrokesPlusDotnet,
  sp: new StrokesPlusDotnet(),
};
