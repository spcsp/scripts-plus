class Calc {
  constructor({ environment }) {
    this.EXE_PATH = String.raw`${environment.expand("%WINDIR%")}\system32\calc.exe`;
  }
  
  open() {
    sp.RunOrActivate(this.EXE_PATH);
  }
}

module.exports = Calc;