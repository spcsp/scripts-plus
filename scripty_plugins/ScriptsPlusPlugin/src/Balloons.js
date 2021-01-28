class Balloons {
  constructor({ balloon }) {
    this._balloon = balloon;
  }
  
  create(title) {
    return message => this._balloon(message, { title });
  }
}

module.exports = Balloons;
