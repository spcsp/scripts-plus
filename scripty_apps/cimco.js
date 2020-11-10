class Cimco {
  constructor({ exec, utils, window }) {
    this.TITLE_PARTIAL = "CIMCO";
    this.EXE_PATH = String.raw`C:\Program Files\Mcam2019\common\Editors\CIMCOEdit8\CIMCOEdit.exe`;
    
    this._exec = exec;   
    this._utils = utils;
    this._window = window;   
    
    this._exec.alias("cimco", this.EXE_PATH);
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
    return this.title.split(" - ")[1].replace(/\[|\]/g, "").trim();//.replace(/\\/g, "/");
  }

  get currentPath() {
    return this.abspath.replace(this.filename, "");
  }

  get filename() {
    return this.abspath.split("/").pop();
  }

  get filenameNoExt() {
    const name = this.filename.split(".");

    name.pop();

    return name.join("");
  }
  
  get partNumber() {
    return this.utils.stripOpNum(this.filenameNoExt);
  }
  
  activate() {
    return sp.RunOrActivate(this.EXE_PATH);
  }
}

module.exports = new Cimco(stdlib);