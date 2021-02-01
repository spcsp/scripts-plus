const env = require("./env");
const path = require("./path");

class Calc {
  constructor() {
    this.EXE_PATH = path.join(env.WINDIR, `system32\calc.exe`);
  }
  
  open() {
    sp.RunOrActivate(this.EXE_PATH);
  }
}

module.exports = new Calc();