class Mastercam {  
  TITLE_PARTIAL = "Mastercam";

  constructor({ exec, utils, window }) {
    this._exec = exec;   
    this._utils = utils;
    this._window = window;   
  }
  
  get windows() {
    return this._window.getAppWindows(this);
  }

  get windowTitle() {
    return this.windows[0].Title;
  }

  get isDirty() {
    return this.windowTitle.indexOf("*") > -1 ? true : false;
  }

  get title() {
    return this.windowTitle.replace("*", "");
  }

  get abspath() {
    return this.title.split(" - ")[0];
  }

  get currentPath() {
    return this.abspath.replace(this.filename, "");
  }

  get filename() {
    return this.abspath.split("\\").pop();
  }

  get filenameNoExt() {
    const name = this.filename.split(".");

    name.pop();

    return name.join("");
  }
  
  get partNumber() {
    return this._utils.stripOpNum(this.filenameNoExt);
  }
}

module.exports = new Mastercam(stdlib);