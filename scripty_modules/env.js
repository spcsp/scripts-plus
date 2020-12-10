class Environment {
  expand(name) {
    if (name === "~") return this.HOME;

    return sp.ExpandEnvironmentVariables(name);
  }

  get HOME() {
    return sp.GetStoredString("USER_PROFILE");
  }

  get userModules() {
    return sp.GetStoredString("SCRIPTY_USER_MODULES").replace(/\\/g, "/");
  }
  
  programFiles(...args) {
    const programFiles = sp.ExpandEnvironmentVariables("%PROGRAMFILES%");
    
    return String.raw`${programFiles}/${args.join("/")}`;
  }
}

module.exports = new Environment();
