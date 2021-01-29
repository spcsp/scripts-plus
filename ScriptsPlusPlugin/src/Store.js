class Store {
  TYPES = [
    "Bool",
    "Handle",
    "HistoryScript",
    "Number",
    "Object",
    "Point",
    "Rectangle",
    "String"
  ];
  
  mappings = new Set();

  constructor({ getType }) {
    this._getType = getType;    
  }
  
  get(key) {
    const type = this.mappings[key];
    
    return sp[`GetStored${type}`](key);
  }
  
  set(key, val) {
    if (typeof val === "undefined") {
      throw Error(`No value was supplied for "${key}"`);
    }
    
    const type = this._getType(val);
    
    this.mappings[key] = type;
    
    sp[`Store${type}`](key, val);
  }
  
  del(key) {
    const type = this.mappings[key];
    
    sp[`DeleteStored${type}`](key);
  }
}

module.exports = Store;