class Keyboard { 

  constructor() {
    this._alt = "#";
    this._ctrl = "^";
    this._shift = "+";
    this._tab = "{TAB}";
    this._buffer = "";
  } 
  
  keys(input) {
    return sp.SendKeys(input);
  } 
  
  string(input) {
    return sp.SendString(input);
  }
  
  //Space
  _(input) {
    return this._push(" ");
    if (input) this._push(input);
  }  
  
  tab() {
    return this._push(this._tab);
  }  
  
  ctrl(input) {
    this._push(this._ctrl);
    if (input) this._push(input);
    return this;
  }
  
  alt(input) {
    this._push(this._alt);
    if (input) this._push(input);
    return this;
  }
  
  shift(input = "+") {
    this._push(this._shift);
    if (input) this._push(input);
    return this;
  }
  
  type(input) {
    if (input) this._push(input);
    const copy = this.buffer;
    this.buffer = "";
    this._send(copy);
    return this;
  }
  
  _push(input) {
    this.buffer += input;
    return this;
  }
  
  _send(input) {
    sp.SendKeys(input);
  }
}

module.exports = new Keyboard();
