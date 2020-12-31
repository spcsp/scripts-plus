class Calc {
  constructor({ env }) {
    this.EXE_PATH = String.raw`${env.WINDIR}\system32\calc.exe`;
  }
  
  open() {
    sp.RunOrActivate(this.EXE_PATH);
  }
}

module.exports = Calc;