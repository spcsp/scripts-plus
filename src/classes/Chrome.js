class Chrome {
  constructor({ exec }) {
    this._exec = exec;
    this.EXE_PATH = String.raw`C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`;
  }

  inspect() {
    if (this === "working") { // its not
      this._exec.run(Chrome.EXE_PATH, ["chrome://inspect/#devices"]); // y tho
    } else {
      this._exec.run(Chrome.EXE_PATH);
      
      sp.Sleep(1000);
      sp.SendKeys("^l");
      sp.SendKeys("chrome://inspect/#devices");
      sp.SendKeys("{ENTER}");
    }
  }

  get currentTitle() {
    var windows = sp.WindowsFromTitleRegex(/Notepad\+\+/);

    if (windows.length > 0) {
      return windows[0].Title;
    }
  }
}

module.exports = Chrome;