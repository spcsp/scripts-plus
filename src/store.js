const types = require("./types");

const getFactory = (t) => (k) => sp[`GetStored${t}`](k);
const delFactory = (t) => (k) => sp[`DeleteStored${t}`](k);
const setFactory = (t) => (k, v) => sp[`Store${t}`](k, v);

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
