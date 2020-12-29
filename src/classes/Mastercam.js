class Mastercam {  
  constructor({ exec, fs, utils, window }) {
    this.TITLE_PARTIAL = "Mastercam";
    this.EXE_PATH = String.raw`C:\Program Files\Mcam2019\Mastercam.exe`;
    
    this._fs = fs;
    this._exec = exec;   
    this._utils = utils;
    this._window = window;   
  }
  
  _getExt(str) {
    return str.split(".").pop().toUpperCase();
  }
  
  get pathFiles() {
    return [...$.fs.readdir(this.currentPath)];
  }
  
  get camFiles() {
    return this.pathFiles.filter(f => this._getExt(f).startsWith("M"));
  }

  get ncFiles() {
    return this.pathFiles.filter(f => this._getExt(f) === "NC");
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
  
  activate() {
    return sp.RunOrActivate(this.EXE_PATH);
  }
  
  open(path) {   
    this.activate();
    sp.Sleep(200);
    sp.SendKeys("^o");
    sp.Sleep(200);
    sp.SendString(path);
    sp.Sleep(20);
    sp.SendKeys("{ENTER}");
  }
}

module.exports = Mastercam;