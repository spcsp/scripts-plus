var ScriptsPlus;ScriptsPlus =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/alert.js":
/*!**********************!*\
  !*** ./src/alert.js ***!
  \**********************/
/***/ ((module) => {

/**
 * Create a modal dialog box notification.
 *
 * @param message string
 * @param title   string
 */
function alert(msg, title = "ScriptyStrokes") {
  let keys = [];

  if (typeof msg === "object") {
    keys = Object.keys(msg);
    msg = keys.map(k => `key: ${k}, val: ${msg[k]}`).join("\n");
  }

  if (Array.isArray(msg)) {
    msg = msg.join(",");
  }

  sp.MessageBox(msg, title);
}

module.exports = alert;

/***/ }),

/***/ "./src/babel.js":
/*!**********************!*\
  !*** ./src/babel.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const unpkg = __webpack_require__(/*! ./unpkg */ "./src/unpkg.js");

class Babel {
  constructor() {//
  }

  transform(input, options = {
    presets: ['env']
  }) {
    const babelSrc = unpkg.fetch("@babel/standalone");
    eval(babelSrc);
    const output = Babel.transform(input, options).code;
    return output.replace(`"use strict";`, "");
  }

}

;
module.exports = new Babel();

/***/ }),

/***/ "./src/balloon.js":
/*!************************!*\
  !*** ./src/balloon.js ***!
  \************************/
/***/ ((module) => {

/**
 * Create a balloon message from the tray
 *
 * Wrapper for `sp.ShowBalloonTip()`
 *
 * @param message string
 * @param title   string
 * @param type    "Warning" | "Error" | "Info" | "None"
 * @param timeout number
 */
function balloon(message, opts = {}) {
  return sp.ShowBalloonTip(opts.title || "ScriptsPlus", message, opts.type || "Info", opts.timeout || 3000);
}

module.exports = balloon;

/***/ }),

/***/ "./src/balloons.js":
/*!*************************!*\
  !*** ./src/balloons.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const balloon = __webpack_require__(/*! ./balloon */ "./src/balloon.js");

class Balloons {
  constructor() {
    this._balloon = balloon;
  }

  create(title) {
    return message => this._balloon(message, {
      title
    });
  }

}

module.exports = new Balloons();

/***/ }),

/***/ "./src/cache.js":
/*!**********************!*\
  !*** ./src/cache.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const env = __webpack_require__(/*! ./env */ "./src/env.js");

const fs = __webpack_require__(/*! ./fs */ "./src/fs.js");

const path = __webpack_require__(/*! ./path */ "./src/path.js");

const store = __webpack_require__(/*! ./store */ "./src/store.js");

class Cache {
  constructor() {
    this._cacheDir = env.CACHE_PATH;
    fs.mkdir(this._cacheDir);
  }

  setCacheDir(dir) {
    this._cacheDir = dir;
  }

  keyPath(key) {
    return path.join(this._cacheDir, key);
  }

  scoped(label) {
    this._cacheDir = path.join(this._cacheDir, label);
    fs.mkdir(this._cacheDir);
    return Object.assign(Object.create(this), this);
  }

  has(key) {
    return fs.exists(this.keyPath(key));
  }

  set(key, data) {
    fs.writeFile(this.keyPath(key), data);
  }

  get(key) {
    return fs.readFile(this.keyPath(key));
  }

}

module.exports = new Cache();

/***/ }),

/***/ "./src/calc.js":
/*!*********************!*\
  !*** ./src/calc.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const env = __webpack_require__(/*! ./env */ "./src/env.js");

const path = __webpack_require__(/*! ./path */ "./src/path.js");

class Calc {
  constructor() {
    this.EXE_PATH = path.join([env.WINDIR, `system32\calc.exe`]);
  }

  open() {
    sp.RunOrActivate(this.EXE_PATH);
  }

}

module.exports = new Calc();

/***/ }),

/***/ "./src/chrome.js":
/*!***********************!*\
  !*** ./src/chrome.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

class Chrome {
  constructor() {
    this._exec = exec;
    this.EXE_PATH = String.raw`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`;
  }

  inspect() {
    if (this === "working") {
      // its not
      this._exec.run(Chrome.EXE_PATH, ["chrome://inspect/#devices"]); // y tho

    } else {
      this._exec.run(Chrome.EXE_PATH);

      sp.Sleep(1000);
      sp.SendKeys("^l");
      sp.SendKeys("chrome://inspect/#devices");
      sp.SendKeys("{ENTER}");
    }
  }

  get currentTitle() {
    var windows = sp.WindowsFromTitleRegex(/Notepad\+\+/);

    if (windows.length > 0) {
      return windows[0].Title;
    }
  }

}

module.exports = Chrome;

/***/ }),

/***/ "./src/cimco.js":
/*!**********************!*\
  !*** ./src/cimco.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

const utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

const window = __webpack_require__(/*! ./window */ "./src/window.js");

class Cimco {
  constructor() {
    this.TITLE_PARTIAL = "CIMCO";
    this.EXE_PATH = String.raw`C:\Program Files\Mcam2019\common\Editors\CIMCOEdit8\CIMCOEdit.exe`;
    this._exec = exec;
    this._utils = utils;
    this._window = window;

    this._exec.alias("cimco", this.EXE_PATH);
  }

  get windows() {
    return this._window.getAppWindows(this);
  }

  get windowTitle() {
    return this.windows[0].Title;
  }

  get isDirty() {
    return this.windowTitle.indexOf("*") > -1 ? true : false;
  }

  get title() {
    return this.windowTitle.replace("*", "");
  }

  get abspath() {
    return this.title.split(" - ")[1].replace(/\[|\]/g, "").trim(); //.replace(/\\/g, "/");
  }

  get currentPath() {
    return this.abspath.replace(this.filename, "");
  }

  get filename() {
    return this.abspath.split("/").pop();
  }

  get filenameNoExt() {
    const name = this.filename.split(".");
    name.pop();
    return name.join("");
  }

  get partNumber() {
    return this.utils.stripOpNum(this.filenameNoExt);
  }

  activate() {
    return sp.RunOrActivate(this.EXE_PATH);
  }

  open(path) {
    this.activate();
    sp.Sleep(200);
    sp.SendKeys("^o");
    sp.Sleep(200);
    sp.SendString(path);
    sp.Sleep(20);
    sp.SendKeys("{ENTER}");
  }

}

module.exports = new Cimco();

/***/ }),

/***/ "./src/createNanoEvents.js":
/*!*********************************!*\
  !*** ./src/createNanoEvents.js ***!
  \*********************************/
/***/ ((module) => {

/**
 * NanoEvents
 *
 * @link https://github.com/ai/nanoevents
 */
const createNanoEvents = () => ({
  events: {},

  emit(event, ...args) {
    for (let i of this.events[event] || []) {
      i(...args);
    }
  },

  on(event, cb) {
    ;
    (this.events[event] = this.events[event] || []).push(cb);
    return () => this.events[event] = this.events[event].filter(i => i !== cb);
  }

});

module.exports = createNanoEvents;

/***/ }),

/***/ "./src/datestamp.js":
/*!**************************!*\
  !*** ./src/datestamp.js ***!
  \**************************/
/***/ ((module) => {

function datestamp() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${mm}/${dd}/${today.getFullYear()}`;
}

module.exports = datestamp;

/***/ }),

/***/ "./src/dialog.js":
/*!***********************!*\
  !*** ./src/dialog.js ***!
  \***********************/
/***/ ((module) => {

const {
  AnchorStyles,
  Button,
  DialogResult,
  Form,
  Label,
  TextBox
} = forms.System.Windows.Forms;

class Dialog {
  constructor() {
    this.OK = DialogResult.OK;
    this.CANCEL = DialogResult.Cancel;
    this.ANCHOR = {
      RIGHT: AnchorStyles.Right,
      BOTTOM: AnchorStyles.Bottom
    };
    this.form = new Form();
    this.label = new Label();
    this.textBox = new TextBox();
    this.buttonOk = new Button();
    this.buttonOk.Text = "OK";
    this.buttonOk.DialogResult = this.OK;
    this.buttonCancel = new Button();
    this.buttonCancel.Text = "Cancel";
    this.buttonCancel.DialogResult = this.CANCEL;
  }

  create({
    text,
    title
  } = {
    text: "Input:",
    title: "ScriptyStrokes Dialog"
  }) {
    this.label.Text = text;
    this.form.Text = title;
    this.buttonOk.Location = new Point(10, 10);
    this.buttonCancel.Location = new Point(this.buttonOk.Left, this.buttonOk.Height + this.buttonOk.Top + 10);
    this.label.SetBounds(9, 20, 372, 13);
    this.textBox.SetBounds(12, 36, 372, 20);
    this.buttonOk.SetBounds(228, 72, 75, 23);
    this.buttonCancel.SetBounds(309, 72, 75, 23);
    this.label.AutoSize = true;
    this.textBox.Anchor = this.textBox.Anchor | this.ANCHOR.RIGHT;
    this.buttonOk.Anchor = this.ANCHOR.BOTTOM | this.ANCHOR.RIGHT;
    this.buttonCancel.Anchor = this.ANCHOR.BOTTOM | this.ANCHOR.RIGHT;
    this.form.AcceptButton = this.buttonOk;
    this.form.CancelButton = this.buttonCancel;
    this.form.ClientSize = new Size(396, 107); //var controls = formation.control([ label, textBox, buttonOk, buttonCancel ]);
    //var controls = formation.control(label);
    //form.Controls.AddRange(controls);
    //form.ClientSize = new Size(Math.Max(300, label.Right + 10), form.ClientSize.Height);

    this.form.Controls.Add(this.label);
    this.form.Controls.Add(this.textBox);
    this.form.Controls.Add(this.buttonOk);
    this.form.Controls.Add(this.buttonCancel);
    return this;
  }

  show(onSubmit) {
    if (typeof onSubmit !== "function") {
      throw Error("the input for dialog.show() must be a function");
    }

    if (this.form.ShowDialog() == this.OK) {
      const text = this.textBox.Text;
      this.textBox.Text = "";
      onSubmit(text);
    }
  }

}

module.exports = new Dialog();

/***/ }),

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/***/ ((module) => {

class Engine {
  get current() {
    return __spEngineWrapper.Engine;
  }

  get previous() {
    return sp.EngineList().Last().Engine;
  }

  thisEqualsLast(cb) {
    if (this.current.Name == this.previous.Name) {
      cb();
    }
  }

}

module.exports = Engine;

/***/ }),

/***/ "./src/env.js":
/*!********************!*\
  !*** ./src/env.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const specialFolder = __webpack_require__(/*! ./specialFolder */ "./src/specialFolder.js");

class Env {
  constructor() {
    this.WINDIR = this.expand("WINDIR");
    this.HOSTNAME = this.expand("ComputerName");
    this.SYSTEM_ROOT = this.expand("SystemRoot");
    this.APPDATA = this.expand("ApplicationData");
  }

  expand(id) {
    return id => sp.ExpandEnvironmentVariables('%' + id + '%');
  }

  get USER_PROFILE() {
    return specialFolder("UserProfile");
  }

  get LOCAL_APPDATA() {
    return specialFolder("LocalApplicationData");
  }

  get CACHE_PATH() {
    return this.USER_PROFILE + "\\.scripty_cache";
  }

}

module.exports = new Env();

/***/ }),

/***/ "./src/exec.js":
/*!*********************!*\
  !*** ./src/exec.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const alert = __webpack_require__(/*! ./alert */ "./src/alert.js");

const env = __webpack_require__(/*! ./env */ "./src/env.js");

const path = __webpack_require__(/*! ./path */ "./src/path.js");

class Exec {
  constructor() {
    this._sysRoot = env.expand("SystemRoot");
    this._programs = env.expand("PROGRAMFILES");
    this._localAppDir = env.expand("LOCALAPPDATA");
    this._aliases = {
      git: path.join(this._sysRoot, `Git/git-bash.exe`),
      explorer: path.join(this._sysRoot, "explorer.exe"),
      "np++": String.raw`C:\Program Files\Notepad++\notepad++.exe`
    };
  }

  getProgramInstance(program) {
    const abspath = this._aliases.hasOwnProperty(program) ? this._aliases[program] : program;
    return sp.RunOrActivate(abspath);
  }
  /**
   * Create a new program alias
   *
   * @example ```
   *   exec.alias("np++", String.raw`C:\Program Files\Notepad++\notepad++.exe`);
   * ```
   */


  alias(alias, path) {
    this._aliases[alias] = path;
  }
  /**
   * Run a command using `sp.RunProgram`
   */


  run(cmd, args = [], config = {}) {
    const opts = Object.assign({
      args,
      verb: "open",
      style: "normal",
      noWindow: false,
      waitForExit: false,
      useShellExecute: false
    }, config);
    const styles = ["hidden", "normal", "minimized", "maximized"];

    if (!styles.includes(opts.style)) {
      alert(`ERROR: ${opts.style} is not a valid style`);
    }

    const program = this._aliases.hasOwnProperty(cmd) ? this._aliases[cmd] : cmd;
    return sp.RunProgram(program, opts.args.join(" "), opts.verb, opts.style, opts.useShellExecute, opts.noWindow, opts.waitForExit);
  }
  /**
   * Create a function that is bound to an EXE
   */


  create(exe) {
    return (args = [], config = {}) => this.run(exe, args, config);
  }

}

module.exports = new Exec();

/***/ }),

/***/ "./src/explorer.js":
/*!*************************!*\
  !*** ./src/explorer.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

const regedit = __webpack_require__(/*! ./regedit */ "./src/regedit.js");

const window = __webpack_require__(/*! ./window */ "./src/window.js");

class Explorer {
  constructor() {
    this._exec = exec;
    this._hkeyCurrentUser = regedit.readers.CurrentUser;

    this._exec.alias("explorer", sp.ExpandEnvironmentVariables("%SystemRoot%") + "\\explorer.exe");
  }

  get USER_PROFILE() {
    return sp.ExpandEnvironmentVariables("%USERPROFILE%");
  }

  getUNCpath(driveLetter) {
    return this._hkeyCurrentUser("NETWORK", driveLetter, "RemotePath");
  }

  mapUNCpath(abspath) {
    const driveLetter = abspath[0];
    const remotePath = this.getUNCpath(driveLetter);
    return abspath.replace(new RegExp(`^${driveLetter}\\:`), remotePath);
  }

  open(dir) {
    //const pathExplored = this._utils.backslash(dir ? dir : this.USER_PROFILE);
    $.exec.run("explorer", [dir]); //return pathExplored;
  }

}

module.exports = new Explorer();

/***/ }),

/***/ "./src/fs.js":
/*!*******************!*\
  !*** ./src/fs.js ***!
  \*******************/
/***/ ((module) => {

class Fs {
  constructor({
    Directory
  }) {
    this._dir = Directory;
  }

  cp(src, dest, overwrite = false) {
    return File.Copy(src, dest, overwrite);
  }

  exists(abspath) {
    return File.Exists(abspath);
  }

  mv(src, dest) {
    return File.Move(src, dest);
  }

  mkdir(dir) {
    return this._dir.CreateDirectory(dir);
  }

  readdir(dir) {
    return this._dir.GetFiles(dir);
  }

  readFile(filepath) {
    return File.ReadAllText(filepath);
  }

  writeFile(filepath, content) {
    return File.WriteAllText(filepath, content);
  }

}

module.exports = new Fs(clr.System.IO);

/***/ }),

/***/ "./src/getType.js":
/*!************************!*\
  !*** ./src/getType.js ***!
  \************************/
/***/ ((module) => {

function getType(obj) {
  switch (typeof obj) {
    case "boolean":
      return "Bool";

    case "string":
      return "String";

    case "object":
      return "Object";

    default:
      return obj.GetType().Name;
  }
}

module.exports = getType;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createNanoEvents = __webpack_require__(/*! ./createNanoEvents */ "./src/createNanoEvents.js");

function ScriptsPlus(config) {
  return {
    alert: __webpack_require__(/*! ./alert */ "./src/alert.js"),
    babel: __webpack_require__(/*! ./babel */ "./src/babel.js"),
    balloon: __webpack_require__(/*! ./balloon */ "./src/balloon.js"),
    balloons: __webpack_require__(/*! ./balloons */ "./src/balloons.js"),
    cache: __webpack_require__(/*! ./cache */ "./src/cache.js"),
    calc: __webpack_require__(/*! ./calc */ "./src/calc.js"),
    chrome: __webpack_require__(/*! ./chrome */ "./src/chrome.js"),
    cimco: __webpack_require__(/*! ./cimco */ "./src/cimco.js"),
    datestamp: __webpack_require__(/*! ./datestamp */ "./src/datestamp.js"),
    dialog: __webpack_require__(/*! ./dialog */ "./src/dialog.js"),
    engine: __webpack_require__(/*! ./engine */ "./src/engine.js"),
    env: __webpack_require__(/*! ./env */ "./src/env.js"),
    events: createNanoEvents(),
    exec: __webpack_require__(/*! ./exec */ "./src/exec.js"),
    explorer: __webpack_require__(/*! ./explorer */ "./src/explorer.js"),
    fs: __webpack_require__(/*! ./fs */ "./src/fs.js"),
    getType: __webpack_require__(/*! ./getType */ "./src/getType.js"),
    keyboard: __webpack_require__(/*! ./keyboard */ "./src/keyboard.js"),
    mastercam: __webpack_require__(/*! ./mastercam */ "./src/mastercam.js"),
    mouse: __webpack_require__(/*! ./mouse */ "./src/mouse.js"),
    npp: __webpack_require__(/*! ./notepadPlusPlus */ "./src/notepadPlusPlus.js"),
    path: __webpack_require__(/*! ./path */ "./src/path.js"),
    popup: __webpack_require__(/*! ./popup */ "./src/popup.js"),
    regedit: __webpack_require__(/*! ./regedit */ "./src/regedit.js"),
    request: __webpack_require__(/*! ./request */ "./src/request.js"),
    specialFolder: __webpack_require__(/*! ./specialFolder */ "./src/specialFolder.js"),
    store: __webpack_require__(/*! ./store */ "./src/store.js"),
    strings: __webpack_require__(/*! ./strings */ "./src/strings.js"),
    timer: __webpack_require__(/*! ./timer */ "./src/timer.js"),
    timestamp: __webpack_require__(/*! ./timestamp */ "./src/timestamp.js"),
    toast: __webpack_require__(/*! ./toast */ "./src/toast.js"),
    toaster: __webpack_require__(/*! ./toaster */ "./src/toaster.js"),
    types: __webpack_require__(/*! ./types */ "./src/types.js"),
    unpkg: __webpack_require__(/*! ./unpkg */ "./src/unpkg.js"),
    utils: __webpack_require__(/*! ./utils */ "./src/utils.js"),
    webview: __webpack_require__(/*! ./webview */ "./src/webview.js"),
    window: __webpack_require__(/*! ./window */ "./src/window.js")
  };
}

module.exports = ScriptsPlus;

/***/ }),

/***/ "./src/keyboard.js":
/*!*************************!*\
  !*** ./src/keyboard.js ***!
  \*************************/
/***/ ((module) => {

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

  ctrl(key) {
    sp.SendControlDown();
    sp.SendKeys(key);
    sp.SendControlUp(); //this.keys(`${this._ctrl}${input}`);

    return this;
  }

  alt(key) {
    sp.SendAltDown();
    sp.SendKeys(key);
    sp.SendAltUp(); //this.keys(`${this._alt}${input}`);

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

  liftAllSpecialKeys() {
    sp.SendWinUp();
    sp.SendAltUp();
    sp.SendShiftUp();
    sp.SendControlUp();
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

module.exports = new Keyboard();

/***/ }),

/***/ "./src/mastercam.js":
/*!**************************!*\
  !*** ./src/mastercam.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

const fs = __webpack_require__(/*! ./fs */ "./src/fs.js");

const utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

const window = __webpack_require__(/*! ./window */ "./src/window.js");

class Mastercam {
  constructor() {
    _defineProperty(this, "TITLE_PARTIAL", "Mastercam Mill");

    _defineProperty(this, "EXE_PATH", String.raw`C:\Program Files\Mcam2019\Mastercam.exe`);
  }

  _getExt(str) {
    return str.split(".").pop().toUpperCase();
  }

  get pathFiles() {
    return Array.from(fs.readdir(this.currentPath));
  }

  get camFiles() {
    return this.pathFiles.filter(f => this._getExt(f).startsWith("M"));
  }

  get ncFiles() {
    return this.pathFiles.filter(f => this._getExt(f) === "NC");
  }

  get window() {
    return sp.WindowsFromTitleRegex('Mastercam Mill 2019$')[0];
  }

  get rawWindowTitle() {
    return this.window.Title;
  }

  get isDirty() {
    return this.rawWindowTitle.indexOf("*") > -1 ? true : false;
  }

  get title() {
    return this.rawWindowTitle.replace("*", "");
  }

  get abspath() {
    return this.title.split(" - ")[0];
  }

  get ncFileAbspath() {
    return this.abspath.replace(/\.[^\/.]+$/, ".NC");
  }

  get jobPath() {
    return this.abspath.replace(this.filename, "");
  }

  get filename() {
    return this.abspath.split("\\").pop();
  }

  get filenameNoExt() {
    const name = this.filename.split(".");
    name.pop();
    return name.join("");
  }

  get partNumber() {
    return utils.stripOpNum(this.filenameNoExt);
  }

  activate() {
    return sp.RunOrActivate(this.EXE_PATH);
  }

  open(path) {
    this.activate();
    sp.Sleep(200);
    sp.SendKeys("^o");
    sp.Sleep(200);
    sp.SendString(path);
    sp.Sleep(20);
    sp.SendKeys("{ENTER}");
  }

}

module.exports = new Mastercam();

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Mouse {
  get currentPoint() {
    return sp.GetCurrentMousePoint();
  }

  get X() {
    return this.currentPoint.X;
  }

  get Y() {
    return this.currentPoint.Y;
  }

  constructor() {//

    _defineProperty(this, "L_BUTTON", MouseButtons.Left);

    _defineProperty(this, "R_BUTTON", MouseButtons.Right);

    _defineProperty(this, "defaults", {
      pauseTime: 100,
      subMenuWaitTime: 500
    });

    _defineProperty(this, "hooks", {
      move: {
        before: function () {},
        after: function () {}
      },
      click: {
        before: function () {},
        after: function () {}
      }
    });
  }

  pause(t) {
    sp.Sleep(t || this.defaults.pauseTime);
    return this;
  }

  waitForSubmenu() {
    sp.Sleep(this.defaults.subMenuWaitTime);
    return this;
  }

  G90() {
    this.mode = "G90";
    this.absolute = true;
    this.incremental = false;
    return this;
  }

  G91() {
    this.mode = "G91";
    this.absolute = false;
    this.incremental = true;
    return this;
  }

  absolute(movements = () => []) {
    movements().forEach(coords => this.xyAbs(coords[0], coords[1]));
    return this;
  }

  incremental(movements = () => []) {
    movements().forEach(coords => this.xyInc(coords[0], coords[1]));
    return this;
  }

  xyAbs(x = 0, y = 0) {
    this.hooks.move.before();
    sp.MouseMove(new Point(x, y));
    this.hooks.move.after();
    return this;
  }

  xyInc(x = 0, y = 0) {
    const xDest = this.currentPoint.X + x;
    const yDest = this.currentPoint.Y + y;
    this.hooks.move.before();
    sp.MouseMove(new Point(xDest, yDest));
    this.hooks.move.after();
    return this;
  }
  /**
   * Move the mouse to a point
   */


  move(x, y) {
    const prevPoint = this.currentPoint;
    this.hooks.move.before();
    sp.MouseMove(new Point(x, y));
    this.hooks.move.after(prevPoint);
    return this;
  }
  /**
   * Click at a point
   */


  click(x, y) {
    return this.leftClick(x, y);
  }

  leftClick(x, y) {
    let point = this.currentPoint;

    if (typeof x === "number" && typeof y === "number") {
      point = new Point(x, y);
    }

    this.hooks.click.before();
    sp.MouseClick(point, this.L_BUTTON, true, true);
    this.hooks.click.after();
    return this;
  }

  rightClick(x, y) {
    let point = this.currentPoint;

    if (typeof x === "number" && typeof y === "number") {
      point = new Point(x, y);
    }

    this.hooks.click.before();
    sp.MouseClick(point, this.R_BUTTON, true, true);
    this.hooks.click.after();
    return this;
  }

}

;
module.exports = new Mouse();

/***/ }),

/***/ "./src/notepadPlusPlus.js":
/*!********************************!*\
  !*** ./src/notepadPlusPlus.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

const window = __webpack_require__(/*! ./window */ "./src/window.js");

class NotepadPlusPlus {
  constructor() {
    _defineProperty(this, "TITLE_PARTIAL", "Notepad++");

    _defineProperty(this, "EXE_PATH", String.raw`C:\Program Files (x86)\Notepad++\notepad++.exe`);
  }

  openFile(abspath) {
    sp.RunProgram("notepad++", `"${abspath}"`, "open", "normal", true, false, false);
  }

  run(args = [], config = {}) {
    return exec.run(this.EXE_PATH, args, config);
  }

  get windows() {
    return window.getAppWindows(this);
  }

  get title() {
    return this.windows[0].Title;
  }

}

module.exports = new NotepadPlusPlus();

/***/ }),

/***/ "./src/path.js":
/*!*********************!*\
  !*** ./src/path.js ***!
  \*********************/
/***/ ((module) => {

function join(path1, path2) {
  return path1 + "\\" + path2;
}

function toUNC(abspath) {
  if (abspath.startsWith("Z")) {
    return abspath.replace(/^Z\:/, "\\\\hbdatavm\\cnc");
  } else if (abspath.startsWith("V")) {
    return abspath.replace(/^V\:/, "\\\\hbdatavm\\cnc\\Program Vault");
  } else {
    return abspath;
  }
}

function exists(p) {
  return clr.System.IO.Path.Exists(p);
}

module.exports = {
  exists,
  join,
  toUNC
};

/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/***/ ((module) => {

function popup(menuItems) {
  const menu = new PopupMenuInfoEx(sp.GetCurrentMousePoint());
  menuItems.forEach(m => menu.MenuItems.Add(m));
  return sp.ShowPopupMenuEx(menu);
}

popup.spacer = () => new PopupMenuItem("-");

popup.cancel = () => new PopupMenuItem("Cancel");

popup.menuItem = (...args) => new PopupMenuItem(...args);

popup.addToMenu = menu => item => menu.MenuItems.Add(item);

popup.addToSubMenu = menu => item => menu.SubMenuItems.Add(item); //popup.show = (popup) => sp.ShowPopupMenuEx(popup);


popup.subMenu = (text, items) => {
  const menu = popup.menuItem(text);
  const add = popup.addToSubMenu(menu);
  items.forEach(item => add(popup.menuItem(item)));
  return menu;
};

module.exports = popup;

/***/ }),

/***/ "./src/regedit.js":
/*!************************!*\
  !*** ./src/regedit.js ***!
  \************************/
/***/ ((module) => {

class Regedit {
  readKey(root, path, key) {
    return sp.RegistryReadString(root, path, key, true);
  }

  get readers() {
    const CurrentUser = (...pathToKey) => {
      const keyName = pathToKey.pop();
      return this.readKey(Registry.CurrentUser, pathToKey.join("\\"), keyName, true);
    };

    return {
      CurrentUser
    };
  }

}

module.exports = new Regedit();

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/***/ ((module) => {

function queryString(obj) {
  return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join("&");
}

function clientRequest(baseUrl, uri, params) {
  var httpHandler = new HttpClientHandler();
  httpHandler.AutomaticDecompression = host.flags(DecompressionMethods.GZip, DecompressionMethods.Deflate);
  var client = new HttpClient(httpHandler);

  if (baseUrl) {
    client.BaseAddress = new Uri(baseUrl);
  }

  var endpoint = params ? `${uri}?${queryString(params)}` : uri;
  var response = client.GetAsync(endpoint).Result;
  var result = response.Content.ReadAsStringAsync().Result;
  httpHandler.Dispose();
  client.Dispose();
  return result;
}

function request(uri, params) {
  return clientRequest(null, uri, params);
}

request.create = baseUrl => (uri, params) => clientRequest(baseUrl, uri, params);

module.exports = request;

/***/ }),

/***/ "./src/specialFolder.js":
/*!******************************!*\
  !*** ./src/specialFolder.js ***!
  \******************************/
/***/ ((module) => {

function specialFolder(id) {
  const folder = clr.System.Environment.SpecialFolder[id];
  return clr.System.Environment.GetFolderPath(folder);
}

module.exports = specialFolder;

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const types = __webpack_require__(/*! ./types */ "./src/types.js");

const getFactory = t => k => sp[`GetStored${t}`](k);

const delFactory = t => k => sp[`DeleteStored${t}`](k);

const setFactory = t => (k, v) => sp[`Store${t}`](k, v);

class Store {
  constructor() {
    this._keyTypeMap = new Map();
  }

  has(key) {
    return this._keyTypeMap.has(key);
  }

  get(key) {
    if (this.has(key)) {
      const getter = getFactory(this._keyTypeMap[key]);
      return getter(key);
    }
  }

  set(key, val) {
    if (typeof val === "undefined") {
      throw Error(`No value was supplied for "${key}"`);
      return;
    }

    const type = types.getType(val);
    const setter = setFactory(type);

    if (!this.has(key)) {
      this._keyTypeMap.set(key, type);
    }

    setter(key, val);
  }

  del(key) {
    this._keyTypeMap.delete(key);

    const deleter = delFactory(this._keyTypeMap[key]);
    deleter(key);
  }

}

module.exports = new Store();

/***/ }),

/***/ "./src/strings.js":
/*!************************!*\
  !*** ./src/strings.js ***!
  \************************/
/***/ ((module) => {

function allCaps(str) {
  return str.toUpperCase();
}

function increment(str) {
  return str.replace(/(\d+)+/g, (match, number) => parseInt(number) + 1);
}

function decrement(str) {
  return str.replace(/(\d+)+/g, (match, number) => parseInt(number) - 1);
}

module.exports = {
  allCaps,
  decrement,
  increment
};

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/***/ ((module) => {

class Timer {
  constructor() {
    this._id = 0;
  }

  getId() {
    return `__timerID${this._id++}`;
  }

  factory(opts) {
    const interval = opts.interval || -1;
    const initDelay = opts.initDelay || 0;
    return (id, script) => this.create(id, initDelay, interval, script);
  }
  /**
   * Eval a given script after a delay
   */


  setTimeout(script, delay) {
    const timerId = this.getId();
    return this.create(timerId, delay, -1, `${script};sp.DeleteTimer("${timerId}");`);
  }
  /**
   * Eval a script on an interval
   *
   * Returns a function that will delete/cancel the running timer
   */


  setInterval(script, interval) {
    const timerId = this.getId();
    this.create(timerId, 0, interval, script);
    return () => sp.DeleteTimer(timerId);
  }

  create(timerId, initDelay = 0, interval = -1, script) {
    return sp.CreateTimer(timerId, initDelay, interval, script);
  }

  get(id) {
    return sp.GetTimer(id);
  }

  getScript(id) {
    return sp.GetTimerScript(id);
  }

  delete(id) {
    sp.DeleteTimer(id);
  }

  deleteAll() {
    sp.DeleteAllTimers();
  }

}

module.exports = new Timer();

/***/ }),

/***/ "./src/timestamp.js":
/*!**************************!*\
  !*** ./src/timestamp.js ***!
  \**************************/
/***/ ((module) => {

function timestamp() {
  const date = new Date();
  const t = date.getMonth() + 1;
  const g = date.getDate();
  const n = date.getHours();
  const a = date.getMinutes();
  const r = date.getSeconds();
  t = (t < 10 ? "0" : "") + t;
  g = (g < 10 ? "0" : "") + g;
  n = (n < 10 ? "0" : "") + n;
  a = (a < 10 ? "0" : "") + a;
  r = (r < 10 ? "0" : "") + r;
  return date.getFullYear() + "-" + t + "-" + g + " " + n + ":" + a + ":" + r;
}

module.exports = timestamp;

/***/ }),

/***/ "./src/toast.js":
/*!**********************!*\
  !*** ./src/toast.js ***!
  \**********************/
/***/ ((module) => {

/**
 * Create a OSD style popover notification
 *
 * @param message string
 * @param title   string
 */
function toast(message, opts = {}) {
  const info = new DisplayTextInfo();
  info.UsePrimaryScreen = true;
  info.Message = message;

  if (typeof opts === "string") {
    info.Title = opts;
  } else {
    info.Title = typeof opts.title === "string" ? opts.title : "ScriptyStrokes";
  }

  info.ForeColor = opts.textColor || "cyan";
  info.TitleFont = new Font("Segoe UI", 18, host.flags(FontStyle.Bold));
  info.TitleAlignment = opts.titleAlignment || "Center";
  info.MessageFont = new Font("Segoe UI Semibold", 16);
  info.MessageAlignment = opts.messageAlignment || "Center";
  info.Padding = opts.padding || 20;
  info.Duration = opts.duration || 3000;
  info.Location = opts.location || "top";
  info.Opacity = opts.opacity || 0.7;
  info.BackColor = opts.backgroundColor || "black";
  return sp.DisplayText(info);
}

module.exports = toast;

/***/ }),

/***/ "./src/toaster.js":
/*!************************!*\
  !*** ./src/toaster.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const toast = __webpack_require__(/*! ./toast */ "./src/toast.js");

const createToaster = title => message => toast(message, {
  title
});

module.exports = createToaster;

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((module) => {

class Types {
  constructor() {//
  }

  getType(obj) {
    switch (typeof obj) {
      case "boolean":
        return "Bool";

      case "string":
        return "String";

      case "object":
        return "Object";

      default:
        return obj.GetType().Name;
    }
  }

  invalidType(type) {
    return this.getType.TYPES.includes(type) === false;
  }

  match(obj, fns) {
    if (typeof fns["Undefined"] !== "function") {
      throw Error(`You must provide a function for "Undefined"`);
    }

    const type = this.getType(obj);

    if (this.invalidType(type)) {
      throw Error(`"${type}" is not a valid type to match against.`);
    }

    if (typeof fns[type] === "function") {
      fns[type]();
    } else {
      fns["Undefined"]();
    }
  }

}

module.exports = new Types();

/***/ }),

/***/ "./src/unpkg.js":
/*!**********************!*\
  !*** ./src/unpkg.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const cache = __webpack_require__(/*! ./cache */ "./src/cache.js");

const request = __webpack_require__(/*! ./request */ "./src/request.js");

class Unpkg {
  constructor() {
    this._cache = cache;
    this._client = request.create("https://unpkg.com");
  }

  fetch(pkg, opts = {
    cache: true
  }) {
    const unslash = p => p.replace("/", "__");

    if (!opts.cache) {
      return this._client(pkg);
    }

    const scopedCache = $.cache.scoped("unpkg");

    if (!scopedCache.has(unslash(pkg))) {
      const src = this._client(pkg);

      scopedCache.set(unslash(pkg), src);
    }

    return scopedCache.get(unslash(pkg));
  }

}

;
module.exports = new Unpkg();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

module.exports.sleep = n => sp.Sleep(n);

module.exports.stripOpNum = f => f.replace(/_(op|OP)[0-9]/, "");

module.exports.backslash = i => i.replace(/\//g, "\\\\");

/***/ }),

/***/ "./src/webview.js":
/*!************************!*\
  !*** ./src/webview.js ***!
  \************************/
/***/ ((module) => {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  BorderStyle,
  Form,
  FormBorderStyle,
  WebBrowser
} = forms.System.Windows.Forms;

class WebView {
  constructor() {
    //this._views = __autoloaded_webviews;
    this._form = null;
    this._browser = null;
    this.waterCss = false;
    this.embedJquery = false;
    this.html = "<p>Hello World!</p>";
  }

  get document() {
    return `<!DOCTYPE html>
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${this.getHead()}
      </head>
      <body>${this.getBody()}</body>  
      </html>`;
  }

  get templateData() {
    const $view = {
      title: this.title,
      ratio: this.ratio,
      width: this.width,
      height: this.height
    };
    return Object.assign({}, {
      $view
    }, this.data);
  }
  /**
   * Main method for rendering a WebView class
   */


  show(config) {
    this.title = config.constructor.name;
    Object.assign(this, config);

    this._calculateDimensions();

    this._initBrowser();

    this._initForm();

    this._form.ShowDialog(); // Blocking!


    this._browser.Dispose();

    this._form.Dispose();
  }

  getHead() {
    const styles = [//this._style(this.CSS_RESET),
    this._style(`html,body {width: 100%;height: ${this.height}px;overflow: hidden;}`), this.waterCss ? this._style(this.WATER_CSS) : false, this.css ? this._style(this.css) : false];
    const scripts = [this._script(this.JSON), this.embedJquery ? this._script(this.JQUERY) : false, this._eventHandler(this.onLoad, "window.onload"), this._eventHandler(this.onKeyUp, "document.onkeyup"), this._eventHandler(this.onMouseUp, "document.onmouseup")];
    return [...styles, ...scripts].filter(Boolean).join("\n");
  }

  getBody() {
    return this._interpolateVars(this.html, this.templateData);
  }

  _calculateDimensions() {
    if (!this.width) this.width = 480;
    if (!this.width && !this.ratio) this.ratio = 4 / 3;
    if (!this.height) this.height = Math.floor(this.width / this.ratio);
  }

  _initForm() {
    this._form = new Form();
    this._form.Text = this.title;
    this._form.MaximizeBox = false;
    this._form.MinimizeBox = false;
    this._form.FormBorderStyle = FormBorderStyle.FixedToolWindow;
    this._form.Width = this.width + this.BORDER_THICKNESS * 2; // L & R

    this._form.Height = this.height + this.BORDER_THICKNESS + 26; // <-- TITLEBAR!!

    this._form.Controls.Add(this._browser);
  }

  _initBrowser(debug = false) {
    clip.SetText(this.document);
    this._browser = new WebBrowser();
    this._browser.Width = this.width;
    this._browser.Height = this.height;
    this._browser.DocumentText = this.document;
    this._browser.AllowWebBrowserDrop = false;
    this._browser.ScriptErrorsSuppressed = debug;
    this._browser.WebBrowserShortcutsEnabled = false;
    this._browser.IsWebBrowserContextMenuEnabled = false;
  }

  _interpolateVars(src, vars) {
    return src.replace(/{{.*?}}/g, match => {
      const key = match.replace(/{|}|\s/g, "");
      return vars[key] || `${key} key not found ind data`;
    });
  }

  _eventHandler(functionBody, target) {
    if (typeof functionBody === "string") {
      return this._script(`${target} = function() { var e = window.event;
        ${functionBody}
      }`);
    }

    return "";
  }

  _style(input) {
    return `<style>${input}\n</style>`;
  }

  _script(input) {
    return `<script>${input}\n</script>`;
  }
  /* eslint-disable prettier/prettier */

  /* eslint-enable prettier/prettier */


}

_defineProperty(WebView, "BORDER_THICKNESS", 8);

_defineProperty(WebView, "CSS_RESET", String.raw`html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`);

_defineProperty(WebView, "DEFAULT_CSS", String.raw`
    body {filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);}
    p,li {color: white;font: 0.8em sans-serif;margin-bottom:10px;}
    .box {margin: 10px;display: inline-block;}`);

_defineProperty(WebView, "WATER_CSS", String.raw`html{scrollbar-color:#324759 #202b38;scrollbar-width:thin}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue','Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;line-height:1.4;max-width:800px;margin:20px auto;padding:0 10px;word-wrap:break-word;color:#dbdbdb;background:#202b38;text-rendering:optimizeLegibility}button{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}input{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}textarea{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}h1{font-size:2.2em;margin-top:0}h1,h2,h3,h4,h5,h6{margin-bottom:12px;margin-top:24px}h1{color:#fff}h2{color:#fff}h3{color:#fff}h4{color:#fff}h5{color:#fff}h6{color:#fff}strong{color:#fff}b,h1,h2,h3,h4,h5,h6,strong,th{font-weight:600}q::before{content:none}q::after{content:none}blockquote{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}q{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}blockquote>footer{font-style:normal;border:0}blockquote cite{font-style:normal}address{font-style:normal}a[href^='mailto\:']::before{content:'📧 '}a[href^='tel\:']::before{content:'📞 '}a[href^='sms\:']::before{content:'💬 '}mark{background-color:#efdb43;border-radius:2px;padding:0 2px 0 2px;color:#000}button,input[type=button],input[type=checkbox],input[type=radio],input[type=range],input[type=submit],select{cursor:pointer}input:not([type=checkbox]):not([type=radio]),select{display:block}input{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}button{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}textarea{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}select{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}input[type=checkbox],input[type=radio]{height:1em;width:1em}input[type=radio]{border-radius:100%}input{vertical-align:top}label{vertical-align:middle;margin-bottom:4px;display:inline-block}button,input:not([type=checkbox]):not([type=radio]),input[type=range],select,textarea{-webkit-appearance:none}textarea{display:block;margin-right:0;box-sizing:border-box;resize:vertical}textarea:not([cols]){width:100%}textarea:not([rows]){min-height:40px;height:140px}select{background:#161f27 url("data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23efefef'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E") calc(100% - 12px) 50%/12px no-repeat;padding-right:35px}select::-ms-expand{display:none}select[multiple]{padding-right:10px;background-image:none;overflow-y:auto}button,input[type=button],input[type=submit]{padding-right:30px;padding-left:30px}button:hover{background:#324759}input[type=submit]:hover{background:#324759}input[type=button]:hover{background:#324759}input:focus{box-shadow:0 0 0 2px #0096bfab}select:focus{box-shadow:0 0 0 2px #0096bfab}button:focus{box-shadow:0 0 0 2px #0096bfab}textarea:focus{box-shadow:0 0 0 2px #0096bfab}button:active,input[type=button]:active,input[type=checkbox]:active,input[type=radio]:active,input[type=range]:active,input[type=submit]:active{transform:translateY(2px)}button:disabled,input:disabled,select:disabled,textarea:disabled{cursor:not-allowed;opacity:.5}::-moz-placeholder{color:#a9a9a9}:-ms-input-placeholder{color:#a9a9a9}::-ms-input-placeholder{color:#a9a9a9}::placeholder{color:#a9a9a9}fieldset{border:1px #0096bfab solid;border-radius:6px;margin:0;margin-bottom:12px;padding:10px}legend{font-size:.9em;font-weight:600}input[type=range]{margin:10px 0;padding:10px 0;background:0 0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:9.5px;-webkit-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-webkit-slider-thumb{box-shadow:0 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980;-webkit-appearance:none;margin-top:-7px}input[type=range]:focus::-webkit-slider-runnable-track{background:#161f27}input[type=range]::-moz-range-track{width:100%;height:9.5px;-moz-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]::-ms-track{width:100%;height:9.5px;background:0 0;border-color:transparent;border-width:16px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-fill-upper{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;border:1px solid #000;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]:focus::-ms-fill-lower{background:#161f27}input[type=range]:focus::-ms-fill-upper{background:#161f27}a{text-decoration:none;color:#41adff}a:hover{text-decoration:underline}code{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}samp{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}time{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}pre>code{padding:10px;display:block;overflow-x:auto}var{color:#d941e2;font-style:normal;font-family:monospace}kbd{background:#161f27;border:1px solid #526980;border-radius:2px;color:#dbdbdb;padding:2px 4px 2px 4px}img,video{max-width:100%;height:auto}hr{border:none;border-top:1px solid #526980}table{border-collapse:collapse;margin-bottom:10px;width:100%;table-layout:fixed}table caption{text-align:left}td,th{padding:6px;text-align:left;vertical-align:top;word-wrap:break-word}thead{border-bottom:1px solid #526980}tfoot{border-top:1px solid #526980}tbody tr:nth-child(even){background-color:#1a242f}::-webkit-scrollbar{height:10px;width:10px}::-webkit-scrollbar-track{background:#161f27;border-radius:6px}::-webkit-scrollbar-thumb{background:#324759;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#415c73}::-moz-selection{background-color:#1c76c5;color:#fff}::selection{background-color:#1c76c5;color:#fff}details{display:flex;flex-direction:column;align-items:flex-start;background-color:#1a242f;padding:10px 10px 0;margin:1em 0;border-radius:6px;overflow:hidden}details[open]{padding:10px}details>:last-child{margin-bottom:0}details[open] summary{margin-bottom:10px}summary{display:list-item;background-color:#161f27;padding:10px;margin:-10px -10px 0;cursor:pointer;outline:0}summary:focus,summary:hover{text-decoration:underline}details>:not(summary){margin-top:0}summary::-webkit-details-marker{color:#dbdbdb}footer{border-top:1px solid #526980;padding-top:10px;color:#a9b1ba}body>footer{margin-top:40px}@media print{body,button,code,details,input,pre,summary,textarea{background-color:#fff}button,input,textarea{border:1px solid #000}body,button,code,footer,h1,h2,h3,h4,h5,h6,input,pre,strong,summary,textarea{color:#000}summary::marker{color:#000}summary::-webkit-details-marker{color:#000}tbody tr:nth-child(even){background-color:#f2f2f2}a{color:#00f;text-decoration:underline}}`);

module.exports = new WebView();

/***/ }),

/***/ "./src/window.js":
/*!***********************!*\
  !*** ./src/window.js ***!
  \***********************/
/***/ ((module) => {

function getAppWindows(app) {
  return sp.WindowsFromTitlePartial(app.TITLE_PARTIAL);
}

function getAppWindowTitle(app) {
  return getAppWindows(app)[0].Title;
}

function getActive() {
  return sp.ForegroundWindow();
}

function titleMatcher(title, {
  Match,
  NoMatch
}) {
  const match = Match || function () {};

  const nomatch = NoMatch || function () {};

  return getActive().Title === title ? match() : nomatch();
}

const center = action => action.Window.Center();

module.exports = {
  center,
  getActive,
  titleMatcher,
  getAppWindows,
  getAppWindowTitle
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.js");
/******/ })()
;