const EventEmitter = require("events");

const autoload = require("./lib/autoload");

const alert = require("./alert");
const api = require("./api");
const apps = require("./apps");

const balloon = require("./balloon");

function ScriptsPlus(config) {
  const autoloaded = config.autoload ? autoload(config.autoload) : {};
  
  return {
    apps,
    alert,
    api,
    autoloaded,
    balloon,
    balloons: require("./balloons"),
    cache: require("./cache"),
    datestamp: require("./datestamp"),
    dialog: require("./dialog"),
    engine: require("./engine"),
    env: require("./env"),
    events: new EventEmitter(),
    exec: require("./exec"),
    fs: require("./fs"),
    getType: require("./getType"),
    json: require("./json"),
    keyboard: require("./keyboard"),
    mouse: require("./mouse"),
    path: require("./path"),
    popup: require("./popup"),
    regedit: require("./regedit"),
    request: require("./request"),
    specialFolder: require("./specialFolder"),
    store: require("./store"),
    strings: require("./strings"),
    timer: require("./timer"),
    timestamp: require("./timestamp"),
    toast: require("./toast"),
    toaster: require("./toaster"),
    types: require("./types"),
    unpkg: require("./unpkg"),
    utils: require("./utils"),
    webview: require("./webview"),
    window: require("./window"),
  };
}

module.exports = ScriptsPlus;


