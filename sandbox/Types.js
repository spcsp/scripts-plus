class Types {
  constructor({ getType }) {
    this.getType = getType;
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