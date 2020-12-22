class Storage {
  constructor() {
    this.typeMap = {};
  }
  
  get(key) {
    const type = this.typeMap[key];
    
    return sp[`GetStored${type}`](key);
  }
  
  set(key, val) {
    if (typeof val === "undefined") {
      throw Error(`No value was supplied for "${key}"`);
    }
    
    const type = $.getType(val);
    
    this.typeMap[key] = type;
    
    sp[`Store${type}`](key, val);
  }
  
  rem(key) {
    const type = this.typeMap[key];
    
    sp[`DeleteStored${type}`](key);
  }
}

module.exports = new Storage();