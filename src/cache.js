const env = require("./env");
const fs = require("./fs");
const path = require("./path");
const store = require("./store");

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