const specialFolder = require("./specialFolder");

class Env {
  constructor() {    
    this.WINDIR = this.expand("WINDIR");
    this.HOSTNAME = this.expand("ComputerName");
    this.SYSTEM_ROOT = this.expand("SystemRoot");
    this.APPDATA = this.expand("ApplicationData");
  }
  
  expand(id) {
    return id => sp.ExpandEnvironmentVariables('%' + id + '%');
  }
  
  get USER_PROFILE() {
    return specialFolder("UserProfile");
  }
  
  get LOCAL_APPDATA() {
    return specialFolder("LocalApplicationData");
  }
  
  get CACHE_PATH() {
    return this.USER_PROFILE + "\\.scripty_cache";
  }
}

module.exports = new Env();