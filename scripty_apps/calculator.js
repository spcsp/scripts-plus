class Calculator {
  constructor({ env }) {
    this.EXE_PATH = String.raw`${env.expand("%WINDIR%")}\system32\calc.exe`;
  }
  
  open() {
    sp.RunOrActivate(this.EXE_PATH);
  }
}

module.exports = new Calculator(stdlib);