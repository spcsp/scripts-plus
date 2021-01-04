class Keyboard {
  constructor() {
    this._alt = "#";
    this._ctrl = "^";
    this._shift = "+";
  }
      
  keys(input) {
    sp.SendKeys(input);
    return this;
  } 
  
  type(input = "") {
    return this.string(input).enter();
  }
  
  pause(time = 250) {
    sp.Sleep(time);
    return this;
  }
  
  string(input = "") {
    sp.SendString(`${input}`);
    return this;
  }
    
  virtualKeys(...keys) {
    sp.SendModifiedVKeys(...keys);
    return this;
  }
  
  enter(now) {
    this.keys("{ENTER}");
    return this;
  }  
  
  tab(count = 1) {
    this.keys(`{TAB ${count}}`);
    return this;
  }  
  
  ctrl(input = "") {
    this.keys(`${this._ctrl}${input}`);
    return this;
  }
  
  alt(key) {
    sp.SendAltDown();
    sp.SendKeys(key);
    sp.SendAltUp();
    //this.keys(`${this._alt}${input}`);
    return this;
  }
  
  shift(input = "") {
    this.keys(`${this._shift}${input}`);
    return this;
  }
      
  meta(key) {
    sp.SendWinDown();
    sp.SendKeys(key);
    sp.SendWinUp();
    return this;
  }
  
  selectAll() {
    this.ctrl("a");
    return this;
  }
  
  copy() {
    this.ctrl("c");
    return clip.GetText();
  }
  
  cut() {
    this.ctrl("x");
    return clip.GetText();
  }
  
  undo() {
    this.ctrl("z");
    return this;
  }
  
  hook(cb) {
    KeyboardHook.OnKeyboardHookEventAsync.connect(cb);
    return this;
  }
}

module.exports = Keyboard;
