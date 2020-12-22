class Types {  
  match(obj, fns) {
    if (typeof fns["Undefined"] !== "function") {
      throw Error(`You must provide a function for "Undefined"`);
    }
        
    const type = $.getType(obj);

    if (!$.getType.TYPES.includes(type)) {
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