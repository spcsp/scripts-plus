const balloon = require("./balloon");

class Balloons {
  constructor() {
    this._balloon = balloon;
  }
  
  create(title) {
    return message => this._balloon(message, { title });
  }
}

module.exports = new Balloons();
