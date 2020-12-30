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

const TYPES = [
  "Bool",
  "Handle",
  "HistoryScript",
  "Number",
  "Object",
  "Point",
  "Rectangle",
  "String"
];

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
    
    const type = getType(val);
    
    this.typeMap[key] = type;
    
    sp[`Store${type}`](key, val);
  }
  
  del(key) {
    const type = this.typeMap[key];
    
    sp[`DeleteStored${type}`](key);
  }
}

module.exports = new Storage();