const alert = require("./alert");
const env = require("./env");
const path = require("./path");

class Exec {  
  constructor() {
    this._sysRoot = env.expand("SystemRoot");
    this._programs = env.expand("PROGRAMFILES");
    this._localAppDir = env.expand("LOCALAPPDATA");
    
    this._aliases = {
      git: path.join(this._sysRoot, `Git/git-bash.exe`),
      explorer: path.join(this._sysRoot, "explorer.exe"),
      "np++": String.raw`C:\Program Files\Notepad++\notepad++.exe`
    };
  }

  getProgramInstance(program) {
    const abspath = this._aliases.hasOwnProperty(program)
      ? this._aliases[program]
      : program;
    
    return sp.RunOrActivate(abspath);
  }

  /**
   * Create a new program alias
   *
   * @example ```
   *   exec.alias("np++", String.raw`C:\Program Files\Notepad++\notepad++.exe`);
   * ```
   */
  alias(alias, path) {
    this._aliases[alias] = path;
  }
  
  /**
   * Run a command using `sp.RunProgram`
   */
  run(cmd, args = [], config = {}) {
    const opts = Object.assign({
      args,
      verb: "open",
      style: "normal",
      noWindow: false,
      waitForExit: false,
      useShellExecute: false
    }, config);
    
    const styles = ["hidden", "normal", "minimized", "maximized"];
    
    if (!styles.includes(opts.style)) {
      alert(`ERROR: ${opts.style} is not a valid style`);
    }
    
    const program = this._aliases.hasOwnProperty(cmd)
      ? this._aliases[cmd]
      : cmd;
      
    return sp.RunProgram(
      program,
      opts.args.join(" "),
      opts.verb,
      opts.style,
      opts.useShellExecute,
      opts.noWindow,
      opts.waitForExit
    );
  }
  
  /**
   * Create a function that is bound to an EXE
   */
  create(exe) {
    return (args = [], config = {}) => this.run(exe, args, config);
  }
}

module.exports = new Exec();
