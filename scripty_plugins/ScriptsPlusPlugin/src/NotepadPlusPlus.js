class NotepadPlusPlus {
  constructor({ exec, window }) {
    this._exec = exec;   
    this._window = window;   
    
    this.TITLE_PARTIAL = "Notepad++";
    this.EXE_PATH = String.raw`C:\Program Files (x86)\Notepad++\notepad++.exe`;
  }

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
    return this._exec.run(this.EXE_PATH, args, config);
  }

  get windows() {
    return this._window.getAppWindows(this);
  }

  get title() {
    return this.windows[0].Title;
  }
}

module.exports = NotepadPlusPlus;