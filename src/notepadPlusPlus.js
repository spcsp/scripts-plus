const exec = require("./exec");
const window = require("./window");

class NotepadPlusPlus {
  TITLE_PARTIAL = "Notepad++";
  EXE_PATH = String.raw`C:\Program Files (x86)\Notepad++\notepad++.exe`;
  
  openFile(abspath) {
    sp.RunProgram(
      "notepad++",
      `"${abspath}"`,
      "open",
      "normal",
      true,
      false,
      false
    );
  }

  run(args = [], config = {}) {
    return exec.run(this.EXE_PATH, args, config);
  }

  get windows() {
    return window.getAppWindows(this);
  }

  get title() {
    return this.windows[0].Title;
  }
}

module.exports = new NotepadPlusPlus();