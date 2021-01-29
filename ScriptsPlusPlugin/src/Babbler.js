class Babbler {
  static aliasTo = "babel";
  
  constructor({ unpkg }) {
    this._unpkg = unpkg;
  }
  
  transform(input, options = { presets: ['env'] }) {
    const babelSrc = this._unpkg.fetch("@babel/standalone");
    
    eval(babelSrc);

    const output = Babel.transform(input, options).code;

    return output.replace(`"use strict";`, "");
  }
};

module.exports = Babbler;
