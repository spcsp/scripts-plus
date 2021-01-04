class Cache {
  constructor({ env, fs, path, store }) {
    this._fs = fs;
    this._env = env;
    this._path = path;
    this._store = store;
    
    this._cacheDir = this._env.CACHE_PATH;
    this._fs.mkdir(this._cacheDir);    
  }
  
  keyPath(key) {
    return this._path.join(this._cacheDir, key);
  }
  
  scoped(label) {
    this._cacheDir = this._path.join(this._cacheDir, label);
    this._fs.mkdir(this._cacheDir);
    
    return Object.assign(Object.create(this), this);
  }
  
  has(key) {
    return this._fs.exists(this.keyPath(key));
  }
  
  set(key, data) {
    this._fs.writeFile(this.keyPath(key), data);
  }
  
  get(key) {
    return this._fs.readFile(this.keyPath(key));
  }
}

module.exports = Cache;