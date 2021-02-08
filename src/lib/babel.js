const unpkg = require("./unpkg");

class Babel {
  constructor() {
    //
  }

  transform(input, options = { presets: ["env"] }) {
    const babelSrc = unpkg.fetch("@babel/standalone");

    eval(babelSrc);

    const output = Babel.transform(input, options).code;

    return output.replace(`"use strict";`, "");
  }
}

module.exports = new Babel();
