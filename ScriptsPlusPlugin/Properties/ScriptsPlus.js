this.$ =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 220:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ScriptsPlus = {};

const req = __webpack_require__(132);

for (const key of req.keys()) {
  const cleanedKey = key.replace(/\.js$/, "").replace("./", "");
  
  ScriptsPlus[cleanedKey] = req(key);
}

module.exports = ScriptsPlus;

/***/ }),

/***/ 767:
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

/***/ 895:
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
  return sp.ShowBalloonTip(
    opts.title || "ScriptyStrokes",
    message,
    opts.type || "Info",
    opts.timeout || 3000
  );
}

module.exports = balloon;


/***/ }),

/***/ 900:
/***/ ((module) => {

/**
 * NanoEvents
 *
 * @link https://github.com/ai/nanoevents
 */
const createNanoEvents = () => ({
  events: {},
  emit (event, ...args) {
    for (let i of this.events[event] || []) {
      i(...args)
    }
  },
  on (event, cb) {
    ;(this.events[event] = this.events[event] || []).push(cb)
    return () => (this.events[event] = this.events[event].filter(i => i !== cb))
  }
});

module.exports = createNanoEvents

/***/ }),

/***/ 890:
/***/ ((module) => {

function datestamp() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; 
  
  if (dd < 10) { dd = `0${dd}`; } 
  if (mm < 10) { mm = `0${mm}`; } 
  
  return `${mm}/${dd}/${today.getFullYear()}`;
}

module.exports = datestamp;


/***/ }),

/***/ 585:
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
};

module.exports = getType;

/***/ }),

/***/ 464:
/***/ ((module) => {

function objKeysToStr(obj) {
  const keys = Object.keys(obj);

  return keys.map(k => `key: ${k}, typeof: ${typeof obj[k]}`).join("\n");
}

module.exports = objKeysToStr;

/***/ }),

/***/ 82:
/***/ ((module) => {

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

function join(path1, path2) {
  return clr.System.IO.Path.Combine(path1, path2);
}

module.exports = {
  exists,
  join,
  toUNC
};


/***/ }),

/***/ 26:
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

popup.addToSubMenu = menu => item => menu.SubMenuItems.Add(item);

//popup.show = (popup) => sp.ShowPopupMenuEx(popup);

popup.subMenu = (text, items) => {
  const menu = popup.menuItem(text);
  const add = popup.addToSubMenu(menu);
  
  items.forEach(item => add(popup.menuItem(item)));
  
  return menu;
};

module.exports = popup;

/***/ }),

/***/ 674:
/***/ ((module) => {

function queryString(obj) {
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
}

function clientRequest(baseUrl, uri, params) {
  var httpHandler = new HttpClientHandler();
  
  httpHandler.AutomaticDecompression = host.flags(
    DecompressionMethods.GZip,
    DecompressionMethods.Deflate
  );
  
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

/***/ 840:
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

/***/ 915:
/***/ ((module) => {

function timestamp() {
  const date = new Date;
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

  return date.getFullYear() + "-" + t + "-" + g + " " + n + ":" + a + ":" + r
}

module.exports = timestamp;

/***/ }),

/***/ 898:
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

/***/ 847:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const toast = __webpack_require__(898);

const createToaster = title => message => toast(message, { title });

module.exports = createToaster;


/***/ }),

/***/ 78:
/***/ ((module) => {

module.exports.sleep = n => sp.Sleep(n);
module.exports.stripOpNum = f => f.replace(/_(op|OP)[0-9]/, "");
module.exports.backslash = i => i.replace(/\//g, "\\\\");


/***/ }),

/***/ 764:
/***/ ((module) => {

function getAppWindows(app) {
  return sp.WindowsFromTitlePartial(app.TITLE_PARTIAL);
}

function getAppWindowTitle(app) {
  return getAppWindows(app)[0].Title;
}

function getActive() {
  return sp.ForegroundWindow()
}

function titleMatcher(title, { Match, NoMatch }) {
  const match = Match || function(){};
  const nomatch = NoMatch || function(){};
  return getActive().Title === title ? match() : nomatch();
}

const center = action => action.Window.Center();

module.exports = {
  center,
  getActive,
  titleMatcher,
  getAppWindows,
  getAppWindowTitle,
};

/***/ }),

/***/ 132:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./alert.js": 767,
	"./balloon.js": 895,
	"./createNanoEvents.js": 900,
	"./datestamp.js": 890,
	"./getType.js": 585,
	"./objKeysToStr.js": 464,
	"./path.js": 82,
	"./popup.js": 26,
	"./request.js": 674,
	"./strings.js": 840,
	"./timestamp.js": 915,
	"./toast.js": 898,
	"./toaster.js": 847,
	"./utils.js": 78,
	"./window.js": 764
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 132;

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(220);
/******/ })()
;