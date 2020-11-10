class Keyboard {
  constructor() {
    this.alt = "#";
    this.ctrl = "^";
    this.shift = "+";
  }  
  
  type(input) {
    return sp.SendString(input);
  }
  
  tab() { return this._send("{TAB}"); }
  
  _send(input) {
    sp.SendKeys(input);
    
    return this;
  }
}

module.exports = new Keyboard();
