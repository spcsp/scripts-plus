class Types {
  constructor() {
    //
  }
  
  getType(obj) {
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
  }
  
  invalidType(type) {
    return this.getType.TYPES.includes(type) === false;
  }
  
  match(obj, fns) {
    if (typeof fns["Undefined"] !== "function") {
      throw Error(`You must provide a function for "Undefined"`);
    }
        
    const type = this.getType(obj);

    if (this.invalidType(type)) {
      throw Error(`"${type}" is not a valid type to match against.`);
    }
      
    if (typeof fns[type] === "function") {
      fns[type]();
    } else {
      fns["Undefined"]();
    }
  }
}

module.exports = new Types();