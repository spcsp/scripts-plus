class Toaster {
  constructor({ toast }) {
    this._toast = toast;
  }
  
  create(title) {
    return message => this._toast(message, { title });
  }
}

module.exports = Toaster;
