var $;$ =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/aaaaa.js":
/*!**********************!*\
  !*** ./src/aaaaa.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  alert: __webpack_require__(/*! ./alert */ "./src/alert.js")
};

/***/ }),

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
/******/ 	return __webpack_require__("./src/aaaaa.js");
/******/ })()
;