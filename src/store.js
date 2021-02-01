const types = require("./types");

class Store {
  static TYPES = [
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

  constructor() {
    //
  }
  
  get(key) {
    const type = this.mappings[key];
    
    return sp[`GetStored${type}`](key);
  }
  
  set(key, val) {
    if (typeof val === "undefined") {
      throw Error(`No value was supplied for "${key}"`);
    }
    
    const type = types.getType(val);
    
    this.mappings[key] = type;
    
    sp[`Store${type}`](key, val);
  }
  
  del(key) {
    const type = this.mappings[key];
    
    sp[`DeleteStored${type}`](key);
  }
}

module.exports = new Store();