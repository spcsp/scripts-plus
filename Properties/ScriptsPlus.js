var ScriptsPlus;ScriptsPlus =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/alert.js":
/*!**********************!*\
  !*** ./src/alert.js ***!
  \**********************/
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Create a modal dialog box notification.
 *
 * @param message string
 * @param title   string
 */
function alert(msg) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ScriptyStrokes";
  var keys = [];

  if (_typeof(msg) === "object") {
    keys = Object.keys(msg);
    msg = keys.map(function (k) {
      return "key: ".concat(k, ", val: ").concat(msg[k]);
    }).join("\n");
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var unpkg = __webpack_require__(/*! ./unpkg */ "./src/unpkg.js");

var Babel = /*#__PURE__*/function () {
  function Babel() {//

    _classCallCheck(this, Babel);
  }

  _createClass(Babel, [{
    key: "transform",
    value: function transform(input) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        presets: ['env']
      };
      var babelSrc = unpkg.fetch("@babel/standalone");
      eval(babelSrc);
      var output = Babel.transform(input, options).code;
      return output.replace("\"use strict\";", "");
    }
  }]);

  return Babel;
}();

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
function balloon(message) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return sp.ShowBalloonTip(opts.title || "ScriptsPlus", message, opts.type || "Info", opts.timeout || 3000);
}

module.exports = balloon;

/***/ }),

/***/ "./src/balloons.js":
/*!*************************!*\
  !*** ./src/balloons.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var balloon = __webpack_require__(/*! ./balloon */ "./src/balloon.js");

var Balloons = /*#__PURE__*/function () {
  function Balloons() {
    _classCallCheck(this, Balloons);

    this._balloon = balloon;
  }

  _createClass(Balloons, [{
    key: "create",
    value: function create(title) {
      var _this = this;

      return function (message) {
        return _this._balloon(message, {
          title: title
        });
      };
    }
  }]);

  return Balloons;
}();

module.exports = new Balloons();

/***/ }),

/***/ "./src/cache.js":
/*!**********************!*\
  !*** ./src/cache.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var env = __webpack_require__(/*! ./env */ "./src/env.js");

var fs = __webpack_require__(/*! ./fs */ "./src/fs.js");

var path = __webpack_require__(/*! ./path */ "./src/path.js");

var store = __webpack_require__(/*! ./store */ "./src/store.js");

var Cache = /*#__PURE__*/function () {
  function Cache() {
    _classCallCheck(this, Cache);

    this._cacheDir = env.CACHE_PATH;
    fs.mkdir(this._cacheDir);
  }

  _createClass(Cache, [{
    key: "setCacheDir",
    value: function setCacheDir(dir) {
      this._cacheDir = dir;
    }
  }, {
    key: "keyPath",
    value: function keyPath(key) {
      return path.join(this._cacheDir, key);
    }
  }, {
    key: "scoped",
    value: function scoped(label) {
      this._cacheDir = path.join(this._cacheDir, label);
      fs.mkdir(this._cacheDir);
      return Object.assign(Object.create(this), this);
    }
  }, {
    key: "has",
    value: function has(key) {
      return fs.exists(this.keyPath(key));
    }
  }, {
    key: "set",
    value: function set(key, data) {
      fs.writeFile(this.keyPath(key), data);
    }
  }, {
    key: "get",
    value: function get(key) {
      return fs.readFile(this.keyPath(key));
    }
  }]);

  return Cache;
}();

module.exports = new Cache();

/***/ }),

/***/ "./src/calc.js":
/*!*********************!*\
  !*** ./src/calc.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var env = __webpack_require__(/*! ./env */ "./src/env.js");

var path = __webpack_require__(/*! ./path */ "./src/path.js");

var Calc = /*#__PURE__*/function () {
  function Calc() {
    _classCallCheck(this, Calc);

    this.EXE_PATH = path.join([env.WINDIR, "system32calc.exe"]);
  }

  _createClass(Calc, [{
    key: "open",
    value: function open() {
      sp.RunOrActivate(this.EXE_PATH);
    }
  }]);

  return Calc;
}();

module.exports = new Calc();

/***/ }),

/***/ "./src/chrome.js":
/*!***********************!*\
  !*** ./src/chrome.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _templateObject() {
  var data = _taggedTemplateLiteral(["C:Program Files (x86)GoogleChromeApplicationchrome.exe"], ["C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

var Chrome = /*#__PURE__*/function () {
  function Chrome() {
    _classCallCheck(this, Chrome);

    this._exec = exec;
    this.EXE_PATH = String.raw(_templateObject());
  }

  _createClass(Chrome, [{
    key: "inspect",
    value: function inspect() {
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
  }, {
    key: "currentTitle",
    get: function get() {
      var windows = sp.WindowsFromTitleRegex(/Notepad\+\+/);

      if (windows.length > 0) {
        return windows[0].Title;
      }
    }
  }]);

  return Chrome;
}();

module.exports = Chrome;

/***/ }),

/***/ "./src/cimco.js":
/*!**********************!*\
  !*** ./src/cimco.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _templateObject() {
  var data = _taggedTemplateLiteral(["C:Program FilesMcam2019commonEditorsCIMCOEdit8CIMCOEdit.exe"], ["C:\\Program Files\\Mcam2019\\common\\Editors\\CIMCOEdit8\\CIMCOEdit.exe"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

var utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var window = __webpack_require__(/*! ./window */ "./src/window.js");

var Cimco = /*#__PURE__*/function () {
  function Cimco() {
    _classCallCheck(this, Cimco);

    this.TITLE_PARTIAL = "CIMCO";
    this.EXE_PATH = String.raw(_templateObject());
    this._exec = exec;
    this._utils = utils;
    this._window = window;

    this._exec.alias("cimco", this.EXE_PATH);
  }

  _createClass(Cimco, [{
    key: "activate",
    value: function activate() {
      return sp.RunOrActivate(this.EXE_PATH);
    }
  }, {
    key: "open",
    value: function open(path) {
      this.activate();
      sp.Sleep(200);
      sp.SendKeys("^o");
      sp.Sleep(200);
      sp.SendString(path);
      sp.Sleep(20);
      sp.SendKeys("{ENTER}");
    }
  }, {
    key: "windows",
    get: function get() {
      return this._window.getAppWindows(this);
    }
  }, {
    key: "windowTitle",
    get: function get() {
      return this.windows[0].Title;
    }
  }, {
    key: "isDirty",
    get: function get() {
      return this.windowTitle.indexOf("*") > -1 ? true : false;
    }
  }, {
    key: "title",
    get: function get() {
      return this.windowTitle.replace("*", "");
    }
  }, {
    key: "abspath",
    get: function get() {
      return this.title.split(" - ")[1].replace(/\[|\]/g, "").trim(); //.replace(/\\/g, "/");
    }
  }, {
    key: "currentPath",
    get: function get() {
      return this.abspath.replace(this.filename, "");
    }
  }, {
    key: "filename",
    get: function get() {
      return this.abspath.split("/").pop();
    }
  }, {
    key: "filenameNoExt",
    get: function get() {
      var name = this.filename.split(".");
      name.pop();
      return name.join("");
    }
  }, {
    key: "partNumber",
    get: function get() {
      return this.utils.stripOpNum(this.filenameNoExt);
    }
  }]);

  return Cimco;
}();

module.exports = new Cimco();

/***/ }),

/***/ "./src/createNanoEvents.js":
/*!*********************************!*\
  !*** ./src/createNanoEvents.js ***!
  \*********************************/
/***/ ((module) => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * NanoEvents
 *
 * @link https://github.com/ai/nanoevents
 */
var createNanoEvents = function createNanoEvents() {
  return {
    events: {},
    emit: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iterator = _createForOfIteratorHelper(this.events[event] || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var i = _step.value;
          i.apply(void 0, args);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    on: function on(event, cb) {
      var _this = this;

      ;
      (this.events[event] = this.events[event] || []).push(cb);
      return function () {
        return _this.events[event] = _this.events[event].filter(function (i) {
          return i !== cb;
        });
      };
    }
  };
};

module.exports = createNanoEvents;

/***/ }),

/***/ "./src/datestamp.js":
/*!**************************!*\
  !*** ./src/datestamp.js ***!
  \**************************/
/***/ ((module) => {

function datestamp() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  if (dd < 10) {
    dd = "0".concat(dd);
  }

  if (mm < 10) {
    mm = "0".concat(mm);
  }

  return "".concat(mm, "/").concat(dd, "/").concat(today.getFullYear());
}

module.exports = datestamp;

/***/ }),

/***/ "./src/dialog.js":
/*!***********************!*\
  !*** ./src/dialog.js ***!
  \***********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _forms$System$Windows = forms.System.Windows.Forms,
    AnchorStyles = _forms$System$Windows.AnchorStyles,
    Button = _forms$System$Windows.Button,
    DialogResult = _forms$System$Windows.DialogResult,
    Form = _forms$System$Windows.Form,
    Label = _forms$System$Windows.Label,
    TextBox = _forms$System$Windows.TextBox;

var Dialog = /*#__PURE__*/function () {
  function Dialog() {
    _classCallCheck(this, Dialog);

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

  _createClass(Dialog, [{
    key: "create",
    value: function create() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        text: "Input:",
        title: "ScriptyStrokes Dialog"
      },
          text = _ref.text,
          title = _ref.title;

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
  }, {
    key: "show",
    value: function show(onSubmit) {
      if (typeof onSubmit !== "function") {
        throw Error("the input for dialog.show() must be a function");
      }

      if (this.form.ShowDialog() == this.OK) {
        var text = this.textBox.Text;
        this.textBox.Text = "";
        onSubmit(text);
      }
    }
  }]);

  return Dialog;
}();

module.exports = new Dialog();

/***/ }),

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Engine = /*#__PURE__*/function () {
  function Engine() {
    _classCallCheck(this, Engine);
  }

  _createClass(Engine, [{
    key: "thisEqualsLast",
    value: function thisEqualsLast(cb) {
      if (this.current.Name == this.previous.Name) {
        cb();
      }
    }
  }, {
    key: "current",
    get: function get() {
      return __spEngineWrapper.Engine;
    }
  }, {
    key: "previous",
    get: function get() {
      return sp.EngineList().Last().Engine;
    }
  }]);

  return Engine;
}();

module.exports = Engine;

/***/ }),

/***/ "./src/env.js":
/*!********************!*\
  !*** ./src/env.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var specialFolder = __webpack_require__(/*! ./specialFolder */ "./src/specialFolder.js");

var Env = /*#__PURE__*/function () {
  function Env() {
    _classCallCheck(this, Env);

    this.WINDIR = this.expand("WINDIR");
    this.HOSTNAME = this.expand("ComputerName");
    this.SYSTEM_ROOT = this.expand("SystemRoot");
    this.APPDATA = this.expand("ApplicationData");
  }

  _createClass(Env, [{
    key: "expand",
    value: function expand(id) {
      return function (id) {
        return sp.ExpandEnvironmentVariables('%' + id + '%');
      };
    }
  }, {
    key: "USER_PROFILE",
    get: function get() {
      return specialFolder("UserProfile");
    }
  }, {
    key: "LOCAL_APPDATA",
    get: function get() {
      return specialFolder("LocalApplicationData");
    }
  }, {
    key: "CACHE_PATH",
    get: function get() {
      return this.USER_PROFILE + "\\.scripty_cache";
    }
  }]);

  return Env;
}();

module.exports = new Env();

/***/ }),

/***/ "./src/exec.js":
/*!*********************!*\
  !*** ./src/exec.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _templateObject() {
  var data = _taggedTemplateLiteral(["C:Program FilesNotepad++\notepad++.exe"], ["C:\\Program Files\\Notepad++\\notepad++.exe"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var alert = __webpack_require__(/*! ./alert */ "./src/alert.js");

var env = __webpack_require__(/*! ./env */ "./src/env.js");

var path = __webpack_require__(/*! ./path */ "./src/path.js");

var Exec = /*#__PURE__*/function () {
  function Exec() {
    _classCallCheck(this, Exec);

    this._sysRoot = env.expand("SystemRoot");
    this._programs = env.expand("PROGRAMFILES");
    this._localAppDir = env.expand("LOCALAPPDATA");
    this._aliases = {
      git: path.join(this._sysRoot, "Git/git-bash.exe"),
      explorer: path.join(this._sysRoot, "explorer.exe"),
      "np++": String.raw(_templateObject())
    };
  }

  _createClass(Exec, [{
    key: "getProgramInstance",
    value: function getProgramInstance(program) {
      var abspath = this._aliases.hasOwnProperty(program) ? this._aliases[program] : program;
      return sp.RunOrActivate(abspath);
    }
    /**
     * Create a new program alias
     *
     * @example ```
     *   exec.alias("np++", String.raw`C:\Program Files\Notepad++\notepad++.exe`);
     * ```
     */

  }, {
    key: "alias",
    value: function alias(_alias, path) {
      this._aliases[_alias] = path;
    }
    /**
     * Run a command using `sp.RunProgram`
     */

  }, {
    key: "run",
    value: function run(cmd) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var opts = Object.assign({
        args: args,
        verb: "open",
        style: "normal",
        noWindow: false,
        waitForExit: false,
        useShellExecute: false
      }, config);
      var styles = ["hidden", "normal", "minimized", "maximized"];

      if (!styles.includes(opts.style)) {
        alert("ERROR: ".concat(opts.style, " is not a valid style"));
      }

      var program = this._aliases.hasOwnProperty(cmd) ? this._aliases[cmd] : cmd;
      return sp.RunProgram(program, opts.args.join(" "), opts.verb, opts.style, opts.useShellExecute, opts.noWindow, opts.waitForExit);
    }
    /**
     * Create a function that is bound to an EXE
     */

  }, {
    key: "create",
    value: function create(exe) {
      var _this = this;

      return function () {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _this.run(exe, args, config);
      };
    }
  }]);

  return Exec;
}();

module.exports = new Exec();

/***/ }),

/***/ "./src/explorer.js":
/*!*************************!*\
  !*** ./src/explorer.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

var regedit = __webpack_require__(/*! ./regedit */ "./src/regedit.js");

var window = __webpack_require__(/*! ./window */ "./src/window.js");

var Explorer = /*#__PURE__*/function () {
  function Explorer() {
    _classCallCheck(this, Explorer);

    this._exec = exec;
    this._hkeyCurrentUser = regedit.readers.CurrentUser;

    this._exec.alias("explorer", sp.ExpandEnvironmentVariables("%SystemRoot%") + "\\explorer.exe");
  }

  _createClass(Explorer, [{
    key: "getUNCpath",
    value: function getUNCpath(driveLetter) {
      return this._hkeyCurrentUser("NETWORK", driveLetter, "RemotePath");
    }
  }, {
    key: "mapUNCpath",
    value: function mapUNCpath(abspath) {
      var driveLetter = abspath[0];
      var remotePath = this.getUNCpath(driveLetter);
      return abspath.replace(new RegExp("^".concat(driveLetter, "\\:")), remotePath);
    }
  }, {
    key: "open",
    value: function open(dir) {
      //const pathExplored = this._utils.backslash(dir ? dir : this.USER_PROFILE);
      $.exec.run("explorer", [dir]); //return pathExplored;
    }
  }, {
    key: "USER_PROFILE",
    get: function get() {
      return sp.ExpandEnvironmentVariables("%USERPROFILE%");
    }
  }]);

  return Explorer;
}();

module.exports = new Explorer();

/***/ }),

/***/ "./src/fs.js":
/*!*******************!*\
  !*** ./src/fs.js ***!
  \*******************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fs = /*#__PURE__*/function () {
  function Fs(_ref) {
    var Directory = _ref.Directory;

    _classCallCheck(this, Fs);

    this._dir = Directory;
  }

  _createClass(Fs, [{
    key: "cp",
    value: function cp(src, dest) {
      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return File.Copy(src, dest, overwrite);
    }
  }, {
    key: "exists",
    value: function exists(abspath) {
      return File.Exists(abspath);
    }
  }, {
    key: "mv",
    value: function mv(src, dest) {
      return File.Move(src, dest);
    }
  }, {
    key: "mkdir",
    value: function mkdir(dir) {
      return this._dir.CreateDirectory(dir);
    }
  }, {
    key: "readdir",
    value: function readdir(dir) {
      return this._dir.GetFiles(dir);
    }
  }, {
    key: "readFile",
    value: function readFile(filepath) {
      return File.ReadAllText(filepath);
    }
  }, {
    key: "writeFile",
    value: function writeFile(filepath, content) {
      return File.WriteAllText(filepath, content);
    }
  }]);

  return Fs;
}();

module.exports = new Fs(clr.System.IO);

/***/ }),

/***/ "./src/getType.js":
/*!************************!*\
  !*** ./src/getType.js ***!
  \************************/
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getType(obj) {
  switch (_typeof(obj)) {
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

module.exports = function () {
  return {
    // module.exports = {
    alert: __webpack_require__(/*! ./alert */ "./src/alert.js"),
    babel: __webpack_require__(/*! ./babel */ "./src/babel.js"),
    balloon: __webpack_require__(/*! ./balloon */ "./src/balloon.js"),
    balloons: __webpack_require__(/*! ./balloons */ "./src/balloons.js"),
    cache: __webpack_require__(/*! ./cache */ "./src/cache.js"),
    calc: __webpack_require__(/*! ./calc */ "./src/calc.js"),
    chrome: __webpack_require__(/*! ./chrome */ "./src/chrome.js"),
    cimco: __webpack_require__(/*! ./cimco */ "./src/cimco.js"),
    createNanoEvents: __webpack_require__(/*! ./createNanoEvents */ "./src/createNanoEvents.js"),
    datestamp: __webpack_require__(/*! ./datestamp */ "./src/datestamp.js"),
    dialog: __webpack_require__(/*! ./dialog */ "./src/dialog.js"),
    engine: __webpack_require__(/*! ./engine */ "./src/engine.js"),
    env: __webpack_require__(/*! ./env */ "./src/env.js"),
    exec: __webpack_require__(/*! ./exec */ "./src/exec.js"),
    explorer: __webpack_require__(/*! ./explorer */ "./src/explorer.js"),
    fs: __webpack_require__(/*! ./fs */ "./src/fs.js"),
    getType: __webpack_require__(/*! ./getType */ "./src/getType.js"),
    keyboard: __webpack_require__(/*! ./keyboard */ "./src/keyboard.js"),
    mastercam: __webpack_require__(/*! ./mastercam */ "./src/mastercam.js"),
    mouse: __webpack_require__(/*! ./mouse */ "./src/mouse.js"),
    npp: __webpack_require__(/*! ./notepadPlusPlus */ "./src/notepadPlusPlus.js"),
    // objKeysToStr: require("./objKeysToStr"),
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
};

/***/ }),

/***/ "./src/keyboard.js":
/*!*************************!*\
  !*** ./src/keyboard.js ***!
  \*************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this._alt = "#";
    this._ctrl = "^";
    this._shift = "+";
  }

  _createClass(Keyboard, [{
    key: "keys",
    value: function keys(input) {
      sp.SendKeys(input);
      return this;
    }
  }, {
    key: "type",
    value: function type() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return this.string(input).enter();
    }
  }, {
    key: "pause",
    value: function pause() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
      sp.Sleep(time);
      return this;
    }
  }, {
    key: "string",
    value: function string() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      sp.SendString("".concat(input));
      return this;
    }
  }, {
    key: "virtualKeys",
    value: function virtualKeys() {
      var _sp;

      (_sp = sp).SendModifiedVKeys.apply(_sp, arguments);

      return this;
    }
  }, {
    key: "enter",
    value: function enter(now) {
      this.keys("{ENTER}");
      return this;
    }
  }, {
    key: "tab",
    value: function tab() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.keys("{TAB ".concat(count, "}"));
      return this;
    }
  }, {
    key: "ctrl",
    value: function ctrl(key) {
      sp.SendControlDown();
      sp.SendKeys(key);
      sp.SendControlUp(); //this.keys(`${this._ctrl}${input}`);

      return this;
    }
  }, {
    key: "alt",
    value: function alt(key) {
      sp.SendAltDown();
      sp.SendKeys(key);
      sp.SendAltUp(); //this.keys(`${this._alt}${input}`);

      return this;
    }
  }, {
    key: "shift",
    value: function shift() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      this.keys("".concat(this._shift).concat(input));
      return this;
    }
  }, {
    key: "meta",
    value: function meta(key) {
      sp.SendWinDown();
      sp.SendKeys(key);
      sp.SendWinUp();
      return this;
    }
  }, {
    key: "liftAllSpecialKeys",
    value: function liftAllSpecialKeys() {
      sp.SendWinUp();
      sp.SendAltUp();
      sp.SendShiftUp();
      sp.SendControlUp();
      return this;
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      this.ctrl("a");
      return this;
    }
  }, {
    key: "copy",
    value: function copy() {
      this.ctrl("c");
      return clip.GetText();
    }
  }, {
    key: "cut",
    value: function cut() {
      this.ctrl("x");
      return clip.GetText();
    }
  }, {
    key: "undo",
    value: function undo() {
      this.ctrl("z");
      return this;
    }
  }, {
    key: "hook",
    value: function hook(cb) {
      KeyboardHook.OnKeyboardHookEventAsync.connect(cb);
      return this;
    }
  }]);

  return Keyboard;
}();

module.exports = new Keyboard();

/***/ }),

/***/ "./src/mastercam.js":
/*!**************************!*\
  !*** ./src/mastercam.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _templateObject() {
  var data = _taggedTemplateLiteral(["C:Program FilesMcam2019Mastercam.exe"], ["C:\\Program Files\\Mcam2019\\Mastercam.exe"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

var fs = __webpack_require__(/*! ./fs */ "./src/fs.js");

var utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var window = __webpack_require__(/*! ./window */ "./src/window.js");

var Mastercam = /*#__PURE__*/function () {
  function Mastercam() {
    _classCallCheck(this, Mastercam);

    _defineProperty(this, "TITLE_PARTIAL", "Mastercam Mill");

    _defineProperty(this, "EXE_PATH", String.raw(_templateObject()));
  }

  _createClass(Mastercam, [{
    key: "_getExt",
    value: function _getExt(str) {
      return str.split(".").pop().toUpperCase();
    }
  }, {
    key: "activate",
    value: function activate() {
      return sp.RunOrActivate(this.EXE_PATH);
    }
  }, {
    key: "open",
    value: function open(path) {
      this.activate();
      sp.Sleep(200);
      sp.SendKeys("^o");
      sp.Sleep(200);
      sp.SendString(path);
      sp.Sleep(20);
      sp.SendKeys("{ENTER}");
    }
  }, {
    key: "pathFiles",
    get: function get() {
      return Array.from(fs.readdir(this.currentPath));
    }
  }, {
    key: "camFiles",
    get: function get() {
      var _this = this;

      return this.pathFiles.filter(function (f) {
        return _this._getExt(f).startsWith("M");
      });
    }
  }, {
    key: "ncFiles",
    get: function get() {
      var _this2 = this;

      return this.pathFiles.filter(function (f) {
        return _this2._getExt(f) === "NC";
      });
    }
  }, {
    key: "window",
    get: function get() {
      return sp.WindowsFromTitleRegex('Mastercam Mill 2019$')[0];
    }
  }, {
    key: "rawWindowTitle",
    get: function get() {
      return this.window.Title;
    }
  }, {
    key: "isDirty",
    get: function get() {
      return this.rawWindowTitle.indexOf("*") > -1 ? true : false;
    }
  }, {
    key: "title",
    get: function get() {
      return this.rawWindowTitle.replace("*", "");
    }
  }, {
    key: "abspath",
    get: function get() {
      return this.title.split(" - ")[0];
    }
  }, {
    key: "ncFileAbspath",
    get: function get() {
      return this.abspath.replace(/\.[^\/.]+$/, ".NC");
    }
  }, {
    key: "jobPath",
    get: function get() {
      return this.abspath.replace(this.filename, "");
    }
  }, {
    key: "filename",
    get: function get() {
      return this.abspath.split("\\").pop();
    }
  }, {
    key: "filenameNoExt",
    get: function get() {
      var name = this.filename.split(".");
      name.pop();
      return name.join("");
    }
  }, {
    key: "partNumber",
    get: function get() {
      return utils.stripOpNum(this.filenameNoExt);
    }
  }]);

  return Mastercam;
}();

module.exports = new Mastercam();

/***/ }),

/***/ "./src/mouse.js":
/*!**********************!*\
  !*** ./src/mouse.js ***!
  \**********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Mouse = /*#__PURE__*/function () {
  _createClass(Mouse, [{
    key: "currentPoint",
    get: function get() {
      return sp.GetCurrentMousePoint();
    }
  }, {
    key: "X",
    get: function get() {
      return this.currentPoint.X;
    }
  }, {
    key: "Y",
    get: function get() {
      return this.currentPoint.Y;
    }
  }]);

  function Mouse() {//

    _classCallCheck(this, Mouse);

    _defineProperty(this, "L_BUTTON", MouseButtons.Left);

    _defineProperty(this, "R_BUTTON", MouseButtons.Right);

    _defineProperty(this, "defaults", {
      pauseTime: 100,
      subMenuWaitTime: 500
    });

    _defineProperty(this, "hooks", {
      move: {
        before: function before() {},
        after: function after() {}
      },
      click: {
        before: function before() {},
        after: function after() {}
      }
    });
  }

  _createClass(Mouse, [{
    key: "pause",
    value: function pause(t) {
      sp.Sleep(t || this.defaults.pauseTime);
      return this;
    }
  }, {
    key: "waitForSubmenu",
    value: function waitForSubmenu() {
      sp.Sleep(this.defaults.subMenuWaitTime);
      return this;
    }
  }, {
    key: "G90",
    value: function G90() {
      this.mode = "G90";
      this.absolute = true;
      this.incremental = false;
      return this;
    }
  }, {
    key: "G91",
    value: function G91() {
      this.mode = "G91";
      this.absolute = false;
      this.incremental = true;
      return this;
    }
  }, {
    key: "absolute",
    value: function absolute() {
      var _this = this;

      var movements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return [];
      };
      movements().forEach(function (coords) {
        return _this.xyAbs(coords[0], coords[1]);
      });
      return this;
    }
  }, {
    key: "incremental",
    value: function incremental() {
      var _this2 = this;

      var movements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return [];
      };
      movements().forEach(function (coords) {
        return _this2.xyInc(coords[0], coords[1]);
      });
      return this;
    }
  }, {
    key: "xyAbs",
    value: function xyAbs() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.hooks.move.before();
      sp.MouseMove(new Point(x, y));
      this.hooks.move.after();
      return this;
    }
  }, {
    key: "xyInc",
    value: function xyInc() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var xDest = this.currentPoint.X + x;
      var yDest = this.currentPoint.Y + y;
      this.hooks.move.before();
      sp.MouseMove(new Point(xDest, yDest));
      this.hooks.move.after();
      return this;
    }
    /**
     * Move the mouse to a point
     */

  }, {
    key: "move",
    value: function move(x, y) {
      var prevPoint = this.currentPoint;
      this.hooks.move.before();
      sp.MouseMove(new Point(x, y));
      this.hooks.move.after(prevPoint);
      return this;
    }
    /**
     * Click at a point
     */

  }, {
    key: "click",
    value: function click(x, y) {
      return this.leftClick(x, y);
    }
  }, {
    key: "leftClick",
    value: function leftClick(x, y) {
      var point = this.currentPoint;

      if (typeof x === "number" && typeof y === "number") {
        point = new Point(x, y);
      }

      this.hooks.click.before();
      sp.MouseClick(point, this.L_BUTTON, true, true);
      this.hooks.click.after();
      return this;
    }
  }, {
    key: "rightClick",
    value: function rightClick(x, y) {
      var point = this.currentPoint;

      if (typeof x === "number" && typeof y === "number") {
        point = new Point(x, y);
      }

      this.hooks.click.before();
      sp.MouseClick(point, this.R_BUTTON, true, true);
      this.hooks.click.after();
      return this;
    }
  }]);

  return Mouse;
}();

;
module.exports = new Mouse();

/***/ }),

/***/ "./src/notepadPlusPlus.js":
/*!********************************!*\
  !*** ./src/notepadPlusPlus.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _templateObject() {
  var data = _taggedTemplateLiteral(["C:Program Files (x86)Notepad++\notepad++.exe"], ["C:\\Program Files (x86)\\Notepad++\\notepad++.exe"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var exec = __webpack_require__(/*! ./exec */ "./src/exec.js");

var window = __webpack_require__(/*! ./window */ "./src/window.js");

var NotepadPlusPlus = /*#__PURE__*/function () {
  function NotepadPlusPlus() {
    _classCallCheck(this, NotepadPlusPlus);

    _defineProperty(this, "TITLE_PARTIAL", "Notepad++");

    _defineProperty(this, "EXE_PATH", String.raw(_templateObject()));
  }

  _createClass(NotepadPlusPlus, [{
    key: "openFile",
    value: function openFile(abspath) {
      sp.RunProgram("notepad++", "\"".concat(abspath, "\""), "open", "normal", true, false, false);
    }
  }, {
    key: "run",
    value: function run() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return exec.run(this.EXE_PATH, args, config);
    }
  }, {
    key: "windows",
    get: function get() {
      return window.getAppWindows(this);
    }
  }, {
    key: "title",
    get: function get() {
      return this.windows[0].Title;
    }
  }]);

  return NotepadPlusPlus;
}();

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
  exists: exists,
  join: join,
  toUNC: toUNC
};

/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/***/ ((module) => {

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function popup(menuItems) {
  var menu = new PopupMenuInfoEx(sp.GetCurrentMousePoint());
  menuItems.forEach(function (m) {
    return menu.MenuItems.Add(m);
  });
  return sp.ShowPopupMenuEx(menu);
}

popup.spacer = function () {
  return new PopupMenuItem("-");
};

popup.cancel = function () {
  return new PopupMenuItem("Cancel");
};

popup.menuItem = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(PopupMenuItem, args);
};

popup.addToMenu = function (menu) {
  return function (item) {
    return menu.MenuItems.Add(item);
  };
};

popup.addToSubMenu = function (menu) {
  return function (item) {
    return menu.SubMenuItems.Add(item);
  };
}; //popup.show = (popup) => sp.ShowPopupMenuEx(popup);


popup.subMenu = function (text, items) {
  var menu = popup.menuItem(text);
  var add = popup.addToSubMenu(menu);
  items.forEach(function (item) {
    return add(popup.menuItem(item));
  });
  return menu;
};

module.exports = popup;

/***/ }),

/***/ "./src/regedit.js":
/*!************************!*\
  !*** ./src/regedit.js ***!
  \************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Regedit = /*#__PURE__*/function () {
  function Regedit() {
    _classCallCheck(this, Regedit);
  }

  _createClass(Regedit, [{
    key: "readKey",
    value: function readKey(root, path, key) {
      return sp.RegistryReadString(root, path, key, true);
    }
  }, {
    key: "readers",
    get: function get() {
      var _this = this;

      var CurrentUser = function CurrentUser() {
        for (var _len = arguments.length, pathToKey = new Array(_len), _key = 0; _key < _len; _key++) {
          pathToKey[_key] = arguments[_key];
        }

        var keyName = pathToKey.pop();
        return _this.readKey(Registry.CurrentUser, pathToKey.join("\\"), keyName, true);
      };

      return {
        CurrentUser: CurrentUser
      };
    }
  }]);

  return Regedit;
}();

module.exports = new Regedit();

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/***/ ((module) => {

function queryString(obj) {
  return Object.keys(obj).map(function (k) {
    return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(obj[k]));
  }).join("&");
}

function clientRequest(baseUrl, uri, params) {
  var httpHandler = new HttpClientHandler();
  httpHandler.AutomaticDecompression = host.flags(DecompressionMethods.GZip, DecompressionMethods.Deflate);
  var client = new HttpClient(httpHandler);

  if (baseUrl) {
    client.BaseAddress = new Uri(baseUrl);
  }

  var endpoint = params ? "".concat(uri, "?").concat(queryString(params)) : uri;
  var response = client.GetAsync(endpoint).Result;
  var result = response.Content.ReadAsStringAsync().Result;
  httpHandler.Dispose();
  client.Dispose();
  return result;
}

function request(uri, params) {
  return clientRequest(null, uri, params);
}

request.create = function (baseUrl) {
  return function (uri, params) {
    return clientRequest(baseUrl, uri, params);
  };
};

module.exports = request;

/***/ }),

/***/ "./src/specialFolder.js":
/*!******************************!*\
  !*** ./src/specialFolder.js ***!
  \******************************/
/***/ ((module) => {

function specialFolder(id) {
  var folder = clr.System.Environment.SpecialFolder[id];
  return clr.System.Environment.GetFolderPath(folder);
}

module.exports = specialFolder;

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var types = __webpack_require__(/*! ./types */ "./src/types.js");

var Store = /*#__PURE__*/function () {
  function Store() {//

    _classCallCheck(this, Store);

    _defineProperty(this, "mappings", new Set());
  }

  _createClass(Store, [{
    key: "get",
    value: function get(key) {
      var type = this.mappings[key];
      return sp["GetStored".concat(type)](key);
    }
  }, {
    key: "set",
    value: function set(key, val) {
      if (typeof val === "undefined") {
        throw Error("No value was supplied for \"".concat(key, "\""));
      }

      var type = types.getType(val);
      this.mappings[key] = type;
      sp["Store".concat(type)](key, val);
    }
  }, {
    key: "del",
    value: function del(key) {
      var type = this.mappings[key];
      sp["DeleteStored".concat(type)](key);
    }
  }]);

  return Store;
}();

_defineProperty(Store, "TYPES", ["Bool", "Handle", "HistoryScript", "Number", "Object", "Point", "Rectangle", "String"]);

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
  return str.replace(/(\d+)+/g, function (match, number) {
    return parseInt(number) + 1;
  });
}

function decrement(str) {
  return str.replace(/(\d+)+/g, function (match, number) {
    return parseInt(number) - 1;
  });
}

module.exports = {
  allCaps: allCaps,
  decrement: decrement,
  increment: increment
};

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timer = /*#__PURE__*/function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this._id = 0;
  }

  _createClass(Timer, [{
    key: "getId",
    value: function getId() {
      return "__timerID".concat(this._id++);
    }
  }, {
    key: "factory",
    value: function factory(opts) {
      var _this = this;

      var interval = opts.interval || -1;
      var initDelay = opts.initDelay || 0;
      return function (id, script) {
        return _this.create(id, initDelay, interval, script);
      };
    }
    /**
     * Eval a given script after a delay
     */

  }, {
    key: "setTimeout",
    value: function setTimeout(script, delay) {
      var timerId = this.getId();
      return this.create(timerId, delay, -1, "".concat(script, ";sp.DeleteTimer(\"").concat(timerId, "\");"));
    }
    /**
     * Eval a script on an interval
     *
     * Returns a function that will delete/cancel the running timer
     */

  }, {
    key: "setInterval",
    value: function setInterval(script, interval) {
      var timerId = this.getId();
      this.create(timerId, 0, interval, script);
      return function () {
        return sp.DeleteTimer(timerId);
      };
    }
  }, {
    key: "create",
    value: function create(timerId) {
      var initDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var script = arguments.length > 3 ? arguments[3] : undefined;
      return sp.CreateTimer(timerId, initDelay, interval, script);
    }
  }, {
    key: "get",
    value: function get(id) {
      return sp.GetTimer(id);
    }
  }, {
    key: "getScript",
    value: function getScript(id) {
      return sp.GetTimerScript(id);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      sp.DeleteTimer(id);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      sp.DeleteAllTimers();
    }
  }]);

  return Timer;
}();

module.exports = new Timer();

/***/ }),

/***/ "./src/timestamp.js":
/*!**************************!*\
  !*** ./src/timestamp.js ***!
  \**************************/
/***/ ((module) => {

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function timestamp() {
  var date = new Date();
  var t = date.getMonth() + 1;
  var g = date.getDate();
  var n = date.getHours();
  var a = date.getMinutes();
  var r = date.getSeconds();
  t = (_readOnlyError("t"), (t < 10 ? "0" : "") + t);
  g = (_readOnlyError("g"), (g < 10 ? "0" : "") + g);
  n = (_readOnlyError("n"), (n < 10 ? "0" : "") + n);
  a = (_readOnlyError("a"), (a < 10 ? "0" : "") + a);
  r = (_readOnlyError("r"), (r < 10 ? "0" : "") + r);
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
function toast(message) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var info = new DisplayTextInfo();
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

var toast = __webpack_require__(/*! ./toast */ "./src/toast.js");

var createToaster = function createToaster(title) {
  return function (message) {
    return toast(message, {
      title: title
    });
  };
};

module.exports = createToaster;

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Types = /*#__PURE__*/function () {
  function Types() {//

    _classCallCheck(this, Types);
  }

  _createClass(Types, [{
    key: "getType",
    value: function getType(obj) {
      switch (_typeof(obj)) {
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
  }, {
    key: "invalidType",
    value: function invalidType(type) {
      return this.getType.TYPES.includes(type) === false;
    }
  }, {
    key: "match",
    value: function match(obj, fns) {
      if (typeof fns["Undefined"] !== "function") {
        throw Error("You must provide a function for \"Undefined\"");
      }

      var type = this.getType(obj);

      if (this.invalidType(type)) {
        throw Error("\"".concat(type, "\" is not a valid type to match against."));
      }

      if (typeof fns[type] === "function") {
        fns[type]();
      } else {
        fns["Undefined"]();
      }
    }
  }]);

  return Types;
}();

module.exports = new Types();

/***/ }),

/***/ "./src/unpkg.js":
/*!**********************!*\
  !*** ./src/unpkg.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cache = __webpack_require__(/*! ./cache */ "./src/cache.js");

var request = __webpack_require__(/*! ./request */ "./src/request.js");

var Unpkg = /*#__PURE__*/function () {
  function Unpkg() {
    _classCallCheck(this, Unpkg);

    this._cache = cache;
    this._client = request.create("https://unpkg.com");
  }

  _createClass(Unpkg, [{
    key: "fetch",
    value: function fetch(pkg) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        cache: true
      };

      var unslash = function unslash(p) {
        return p.replace("/", "__");
      };

      if (!opts.cache) {
        return this._client(pkg);
      }

      var scopedCache = $.cache.scoped("unpkg");

      if (!scopedCache.has(unslash(pkg))) {
        var src = this._client(pkg);

        scopedCache.set(unslash(pkg), src);
      }

      return scopedCache.get(unslash(pkg));
    }
  }]);

  return Unpkg;
}();

;
module.exports = new Unpkg();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

module.exports.sleep = function (n) {
  return sp.Sleep(n);
};

module.exports.stripOpNum = function (f) {
  return f.replace(/_(op|OP)[0-9]/, "");
};

module.exports.backslash = function (i) {
  return i.replace(/\//g, "\\\\");
};

/***/ }),

/***/ "./src/webview.js":
/*!************************!*\
  !*** ./src/webview.js ***!
  \************************/
/***/ ((module) => {

function _templateObject3() {
  var data = _taggedTemplateLiteral(["html{scrollbar-color:#324759 #202b38;scrollbar-width:thin}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue','Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;line-height:1.4;max-width:800px;margin:20px auto;padding:0 10px;word-wrap:break-word;color:#dbdbdb;background:#202b38;text-rendering:optimizeLegibility}button{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}input{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}textarea{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}h1{font-size:2.2em;margin-top:0}h1,h2,h3,h4,h5,h6{margin-bottom:12px;margin-top:24px}h1{color:#fff}h2{color:#fff}h3{color:#fff}h4{color:#fff}h5{color:#fff}h6{color:#fff}strong{color:#fff}b,h1,h2,h3,h4,h5,h6,strong,th{font-weight:600}q::before{content:none}q::after{content:none}blockquote{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}q{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}blockquote>footer{font-style:normal;border:0}blockquote cite{font-style:normal}address{font-style:normal}a[href^='mailto:']::before{content:'\uD83D\uDCE7 '}a[href^='tel:']::before{content:'\uD83D\uDCDE '}a[href^='sms:']::before{content:'\uD83D\uDCAC '}mark{background-color:#efdb43;border-radius:2px;padding:0 2px 0 2px;color:#000}button,input[type=button],input[type=checkbox],input[type=radio],input[type=range],input[type=submit],select{cursor:pointer}input:not([type=checkbox]):not([type=radio]),select{display:block}input{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}button{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}textarea{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}select{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}input[type=checkbox],input[type=radio]{height:1em;width:1em}input[type=radio]{border-radius:100%}input{vertical-align:top}label{vertical-align:middle;margin-bottom:4px;display:inline-block}button,input:not([type=checkbox]):not([type=radio]),input[type=range],select,textarea{-webkit-appearance:none}textarea{display:block;margin-right:0;box-sizing:border-box;resize:vertical}textarea:not([cols]){width:100%}textarea:not([rows]){min-height:40px;height:140px}select{background:#161f27 url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23efefef'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E\") calc(100% - 12px) 50%/12px no-repeat;padding-right:35px}select::-ms-expand{display:none}select[multiple]{padding-right:10px;background-image:none;overflow-y:auto}button,input[type=button],input[type=submit]{padding-right:30px;padding-left:30px}button:hover{background:#324759}input[type=submit]:hover{background:#324759}input[type=button]:hover{background:#324759}input:focus{box-shadow:0 0 0 2px #0096bfab}select:focus{box-shadow:0 0 0 2px #0096bfab}button:focus{box-shadow:0 0 0 2px #0096bfab}textarea:focus{box-shadow:0 0 0 2px #0096bfab}button:active,input[type=button]:active,input[type=checkbox]:active,input[type=radio]:active,input[type=range]:active,input[type=submit]:active{transform:translateY(2px)}button:disabled,input:disabled,select:disabled,textarea:disabled{cursor:not-allowed;opacity:.5}::-moz-placeholder{color:#a9a9a9}:-ms-input-placeholder{color:#a9a9a9}::-ms-input-placeholder{color:#a9a9a9}::placeholder{color:#a9a9a9}fieldset{border:1px #0096bfab solid;border-radius:6px;margin:0;margin-bottom:12px;padding:10px}legend{font-size:.9em;font-weight:600}input[type=range]{margin:10px 0;padding:10px 0;background:0 0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:9.5px;-webkit-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-webkit-slider-thumb{box-shadow:0 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980;-webkit-appearance:none;margin-top:-7px}input[type=range]:focus::-webkit-slider-runnable-track{background:#161f27}input[type=range]::-moz-range-track{width:100%;height:9.5px;-moz-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]::-ms-track{width:100%;height:9.5px;background:0 0;border-color:transparent;border-width:16px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-fill-upper{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;border:1px solid #000;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]:focus::-ms-fill-lower{background:#161f27}input[type=range]:focus::-ms-fill-upper{background:#161f27}a{text-decoration:none;color:#41adff}a:hover{text-decoration:underline}code{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}samp{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}time{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}pre>code{padding:10px;display:block;overflow-x:auto}var{color:#d941e2;font-style:normal;font-family:monospace}kbd{background:#161f27;border:1px solid #526980;border-radius:2px;color:#dbdbdb;padding:2px 4px 2px 4px}img,video{max-width:100%;height:auto}hr{border:none;border-top:1px solid #526980}table{border-collapse:collapse;margin-bottom:10px;width:100%;table-layout:fixed}table caption{text-align:left}td,th{padding:6px;text-align:left;vertical-align:top;word-wrap:break-word}thead{border-bottom:1px solid #526980}tfoot{border-top:1px solid #526980}tbody tr:nth-child(even){background-color:#1a242f}::-webkit-scrollbar{height:10px;width:10px}::-webkit-scrollbar-track{background:#161f27;border-radius:6px}::-webkit-scrollbar-thumb{background:#324759;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#415c73}::-moz-selection{background-color:#1c76c5;color:#fff}::selection{background-color:#1c76c5;color:#fff}details{display:flex;flex-direction:column;align-items:flex-start;background-color:#1a242f;padding:10px 10px 0;margin:1em 0;border-radius:6px;overflow:hidden}details[open]{padding:10px}details>:last-child{margin-bottom:0}details[open] summary{margin-bottom:10px}summary{display:list-item;background-color:#161f27;padding:10px;margin:-10px -10px 0;cursor:pointer;outline:0}summary:focus,summary:hover{text-decoration:underline}details>:not(summary){margin-top:0}summary::-webkit-details-marker{color:#dbdbdb}footer{border-top:1px solid #526980;padding-top:10px;color:#a9b1ba}body>footer{margin-top:40px}@media print{body,button,code,details,input,pre,summary,textarea{background-color:#fff}button,input,textarea{border:1px solid #000}body,button,code,footer,h1,h2,h3,h4,h5,h6,input,pre,strong,summary,textarea{color:#000}summary::marker{color:#000}summary::-webkit-details-marker{color:#000}tbody tr:nth-child(even){background-color:#f2f2f2}a{color:#00f;text-decoration:underline}}"], ["html{scrollbar-color:#324759 #202b38;scrollbar-width:thin}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue','Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;line-height:1.4;max-width:800px;margin:20px auto;padding:0 10px;word-wrap:break-word;color:#dbdbdb;background:#202b38;text-rendering:optimizeLegibility}button{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}input{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}textarea{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}h1{font-size:2.2em;margin-top:0}h1,h2,h3,h4,h5,h6{margin-bottom:12px;margin-top:24px}h1{color:#fff}h2{color:#fff}h3{color:#fff}h4{color:#fff}h5{color:#fff}h6{color:#fff}strong{color:#fff}b,h1,h2,h3,h4,h5,h6,strong,th{font-weight:600}q::before{content:none}q::after{content:none}blockquote{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}q{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}blockquote>footer{font-style:normal;border:0}blockquote cite{font-style:normal}address{font-style:normal}a[href^='mailto\\:']::before{content:'\uD83D\uDCE7 '}a[href^='tel\\:']::before{content:'\uD83D\uDCDE '}a[href^='sms\\:']::before{content:'\uD83D\uDCAC '}mark{background-color:#efdb43;border-radius:2px;padding:0 2px 0 2px;color:#000}button,input[type=button],input[type=checkbox],input[type=radio],input[type=range],input[type=submit],select{cursor:pointer}input:not([type=checkbox]):not([type=radio]),select{display:block}input{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}button{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}textarea{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}select{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}input[type=checkbox],input[type=radio]{height:1em;width:1em}input[type=radio]{border-radius:100%}input{vertical-align:top}label{vertical-align:middle;margin-bottom:4px;display:inline-block}button,input:not([type=checkbox]):not([type=radio]),input[type=range],select,textarea{-webkit-appearance:none}textarea{display:block;margin-right:0;box-sizing:border-box;resize:vertical}textarea:not([cols]){width:100%}textarea:not([rows]){min-height:40px;height:140px}select{background:#161f27 url(\"data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23efefef'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E\") calc(100% - 12px) 50%/12px no-repeat;padding-right:35px}select::-ms-expand{display:none}select[multiple]{padding-right:10px;background-image:none;overflow-y:auto}button,input[type=button],input[type=submit]{padding-right:30px;padding-left:30px}button:hover{background:#324759}input[type=submit]:hover{background:#324759}input[type=button]:hover{background:#324759}input:focus{box-shadow:0 0 0 2px #0096bfab}select:focus{box-shadow:0 0 0 2px #0096bfab}button:focus{box-shadow:0 0 0 2px #0096bfab}textarea:focus{box-shadow:0 0 0 2px #0096bfab}button:active,input[type=button]:active,input[type=checkbox]:active,input[type=radio]:active,input[type=range]:active,input[type=submit]:active{transform:translateY(2px)}button:disabled,input:disabled,select:disabled,textarea:disabled{cursor:not-allowed;opacity:.5}::-moz-placeholder{color:#a9a9a9}:-ms-input-placeholder{color:#a9a9a9}::-ms-input-placeholder{color:#a9a9a9}::placeholder{color:#a9a9a9}fieldset{border:1px #0096bfab solid;border-radius:6px;margin:0;margin-bottom:12px;padding:10px}legend{font-size:.9em;font-weight:600}input[type=range]{margin:10px 0;padding:10px 0;background:0 0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:9.5px;-webkit-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-webkit-slider-thumb{box-shadow:0 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980;-webkit-appearance:none;margin-top:-7px}input[type=range]:focus::-webkit-slider-runnable-track{background:#161f27}input[type=range]::-moz-range-track{width:100%;height:9.5px;-moz-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]::-ms-track{width:100%;height:9.5px;background:0 0;border-color:transparent;border-width:16px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-fill-upper{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;border:1px solid #000;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]:focus::-ms-fill-lower{background:#161f27}input[type=range]:focus::-ms-fill-upper{background:#161f27}a{text-decoration:none;color:#41adff}a:hover{text-decoration:underline}code{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}samp{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}time{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}pre>code{padding:10px;display:block;overflow-x:auto}var{color:#d941e2;font-style:normal;font-family:monospace}kbd{background:#161f27;border:1px solid #526980;border-radius:2px;color:#dbdbdb;padding:2px 4px 2px 4px}img,video{max-width:100%;height:auto}hr{border:none;border-top:1px solid #526980}table{border-collapse:collapse;margin-bottom:10px;width:100%;table-layout:fixed}table caption{text-align:left}td,th{padding:6px;text-align:left;vertical-align:top;word-wrap:break-word}thead{border-bottom:1px solid #526980}tfoot{border-top:1px solid #526980}tbody tr:nth-child(even){background-color:#1a242f}::-webkit-scrollbar{height:10px;width:10px}::-webkit-scrollbar-track{background:#161f27;border-radius:6px}::-webkit-scrollbar-thumb{background:#324759;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#415c73}::-moz-selection{background-color:#1c76c5;color:#fff}::selection{background-color:#1c76c5;color:#fff}details{display:flex;flex-direction:column;align-items:flex-start;background-color:#1a242f;padding:10px 10px 0;margin:1em 0;border-radius:6px;overflow:hidden}details[open]{padding:10px}details>:last-child{margin-bottom:0}details[open] summary{margin-bottom:10px}summary{display:list-item;background-color:#161f27;padding:10px;margin:-10px -10px 0;cursor:pointer;outline:0}summary:focus,summary:hover{text-decoration:underline}details>:not(summary){margin-top:0}summary::-webkit-details-marker{color:#dbdbdb}footer{border-top:1px solid #526980;padding-top:10px;color:#a9b1ba}body>footer{margin-top:40px}@media print{body,button,code,details,input,pre,summary,textarea{background-color:#fff}button,input,textarea{border:1px solid #000}body,button,code,footer,h1,h2,h3,h4,h5,h6,input,pre,strong,summary,textarea{color:#000}summary::marker{color:#000}summary::-webkit-details-marker{color:#000}tbody tr:nth-child(even){background-color:#f2f2f2}a{color:#00f;text-decoration:underline}}"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    body {filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);}\n    p,li {color: white;font: 0.8em sans-serif;margin-bottom:10px;}\n    .box {margin: 10px;display: inline-block;}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _forms$System$Windows = forms.System.Windows.Forms,
    BorderStyle = _forms$System$Windows.BorderStyle,
    Form = _forms$System$Windows.Form,
    FormBorderStyle = _forms$System$Windows.FormBorderStyle,
    WebBrowser = _forms$System$Windows.WebBrowser;

var WebView = /*#__PURE__*/function () {
  function WebView() {
    _classCallCheck(this, WebView);

    //this._views = __autoloaded_webviews;
    this._form = null;
    this._browser = null;
    this.waterCss = false;
    this.embedJquery = false;
    this.html = "<p>Hello World!</p>";
  }

  _createClass(WebView, [{
    key: "show",

    /**
     * Main method for rendering a WebView class
     */
    value: function show(config) {
      this.title = config.constructor.name;
      Object.assign(this, config);

      this._calculateDimensions();

      this._initBrowser();

      this._initForm();

      this._form.ShowDialog(); // Blocking!


      this._browser.Dispose();

      this._form.Dispose();
    }
  }, {
    key: "getHead",
    value: function getHead() {
      var styles = [//this._style(this.CSS_RESET),
      this._style("html,body {width: 100%;height: ".concat(this.height, "px;overflow: hidden;}")), this.waterCss ? this._style(this.WATER_CSS) : false, this.css ? this._style(this.css) : false];
      var scripts = [this._script(this.JSON), this.embedJquery ? this._script(this.JQUERY) : false, this._eventHandler(this.onLoad, "window.onload"), this._eventHandler(this.onKeyUp, "document.onkeyup"), this._eventHandler(this.onMouseUp, "document.onmouseup")];
      return [].concat(styles, scripts).filter(Boolean).join("\n");
    }
  }, {
    key: "getBody",
    value: function getBody() {
      return this._interpolateVars(this.html, this.templateData);
    }
  }, {
    key: "_calculateDimensions",
    value: function _calculateDimensions() {
      if (!this.width) this.width = 480;
      if (!this.width && !this.ratio) this.ratio = 4 / 3;
      if (!this.height) this.height = Math.floor(this.width / this.ratio);
    }
  }, {
    key: "_initForm",
    value: function _initForm() {
      this._form = new Form();
      this._form.Text = this.title;
      this._form.MaximizeBox = false;
      this._form.MinimizeBox = false;
      this._form.FormBorderStyle = FormBorderStyle.FixedToolWindow;
      this._form.Width = this.width + this.BORDER_THICKNESS * 2; // L & R

      this._form.Height = this.height + this.BORDER_THICKNESS + 26; // <-- TITLEBAR!!

      this._form.Controls.Add(this._browser);
    }
  }, {
    key: "_initBrowser",
    value: function _initBrowser() {
      var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
  }, {
    key: "_interpolateVars",
    value: function _interpolateVars(src, vars) {
      return src.replace(/{{.*?}}/g, function (match) {
        var key = match.replace(/{|}|\s/g, "");
        return vars[key] || "".concat(key, " key not found ind data");
      });
    }
  }, {
    key: "_eventHandler",
    value: function _eventHandler(functionBody, target) {
      if (typeof functionBody === "string") {
        return this._script("".concat(target, " = function() { var e = window.event;\n        ").concat(functionBody, "\n      }"));
      }

      return "";
    }
  }, {
    key: "_style",
    value: function _style(input) {
      return "<style>".concat(input, "\n</style>");
    }
  }, {
    key: "_script",
    value: function _script(input) {
      return "<script>".concat(input, "\n</script>");
    }
    /* eslint-disable prettier/prettier */

    /* eslint-enable prettier/prettier */

  }, {
    key: "document",
    get: function get() {
      return "<!DOCTYPE html>\n      <html>\n      <head>\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      ".concat(this.getHead(), "\n      </head>\n      <body>").concat(this.getBody(), "</body>  \n      </html>");
    }
  }, {
    key: "templateData",
    get: function get() {
      var $view = {
        title: this.title,
        ratio: this.ratio,
        width: this.width,
        height: this.height
      };
      return Object.assign({}, {
        $view: $view
      }, this.data);
    }
  }]);

  return WebView;
}();

_defineProperty(WebView, "BORDER_THICKNESS", 8);

_defineProperty(WebView, "CSS_RESET", String.raw(_templateObject()));

_defineProperty(WebView, "DEFAULT_CSS", String.raw(_templateObject2()));

_defineProperty(WebView, "WATER_CSS", String.raw(_templateObject3()));

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

function titleMatcher(title, _ref) {
  var Match = _ref.Match,
      NoMatch = _ref.NoMatch;

  var match = Match || function () {};

  var nomatch = NoMatch || function () {};

  return getActive().Title === title ? match() : nomatch();
}

var center = function center(action) {
  return action.Window.Center();
};

module.exports = {
  center: center,
  getActive: getActive,
  titleMatcher: titleMatcher,
  getAppWindows: getAppWindows,
  getAppWindowTitle: getAppWindowTitle
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