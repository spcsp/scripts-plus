class NotepadPlusPlus {
  TITLE_PARTIAL = "Notepad++";
  EXE_PATH = String.raw`C:\Program Files (x86)\Notepad++\notepad++.exe`;
  
  constructor({ exec, window }) {
    this._exec = exec;   
    this._window = window;   
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
    return this._exec.run(NotepadPlusPlus.EXE_PATH, args, config);
  }

  get windows() {
    return this._window.getAppWindows(this);
  }

  get title() {
    return this.windows[0].Title;
  }
}

module.exports = new NotepadPlusPlus(stdlib);