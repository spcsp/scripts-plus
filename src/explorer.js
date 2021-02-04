const exec = require("./exec");
const regedit = require("./regedit");
const window = require("./window");

class Explorer {
  constructor() {
    this._exec = exec;
    this._hkeyCurrentUser = regedit.readers.CurrentUser;
    this._exec.alias(
      "explorer",
      sp.ExpandEnvironmentVariables("%SystemRoot%") + "\\explorer.exe"
    );
  }

  get USER_PROFILE() {
    return sp.ExpandEnvironmentVariables("%USERPROFILE%");
  }

  getUNCpath(driveLetter) {
    return this._hkeyCurrentUser("NETWORK", driveLetter, "RemotePath");
  }

  mapUNCpath(abspath) {
    const driveLetter = abspath[0];
    const remotePath = this.getUNCpath(driveLetter);

    return abspath.replace(new RegExp(`^${driveLetter}\\:`), remotePath);
  }

  open(dir) {
    //const pathExplored = this._utils.backslash(dir ? dir : this.USER_PROFILE);

    $.exec.run("explorer", [dir]);

    //return pathExplored;
  }
}

module.exports = new Explorer();
