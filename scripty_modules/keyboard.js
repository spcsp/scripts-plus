class Keyboard {
  constructor() {
    this._alt = "#";
    this._ctrl = "^";
    this._shift = "+";
    
    this._buffers = {
      main: ""
    };
  } 
  
  _push(input, buffer = "main") {
    this._buffers[buffer] += input;
    //sp.MessageBox(input, ""); //This is for debugging
    return this;
  }
  
  keys(input) {
    return sp.SendKeys(input);
  } 
  
  string(input) {
    return sp.SendString(input);
  }
  
  enter() {
    return this.type("{ENTER}");
  }
  
  //Space
  _(input) {
    return this._push(" ");
    if (input) this._push(input);
    return this;
  }  
  
  tab(count = 1) {
    return this.type(`\{TAB ${count}\}`);
    return this;
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
    this.keys(this._buffers["main"]);
    this.reset();
  }
  
  selectAll() {
    this.ctrl().type("a");
    return this;
  }
  
  copy() {
    this.ctrl().type("c");
    return clip.GetText();
  }
  
  cut() {
    this.ctrl().type("x");
    return clip.GetText();
  }
  
  undo() {
    this.ctrl().type("z");
    return this;
  }
  
  reset() {
    this._buffers["main"] = "";
    return this;    
  }
}

module.exports = new Keyboard();
