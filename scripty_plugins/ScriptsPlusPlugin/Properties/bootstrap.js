function bootstrap(config) {
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment
  
  const fromRoot = p => Path.Combine(config.root, p);
  const expandVar = v => sp.ExpandEnvironmentVariables(`%${v}%`);  
  const specialFolder = n => GetFolderPath(SpecialFolder[n]);
  
  const env = {
    ROOT: config.root,
    USER_PROFILE: specialFolder("UserProfile"),
    WINDIR: expandVar("WINDIR"),
    HOSTNAME: expandVar("ComputerName"),
    SYSTEM_ROOT: expandVar("SystemRoot"),
    APPDATA: expandVar("ApplicationData"),
    LOCAL_APPDATA: specialFolder("LocalApplicationData"),
    CACHE_PATH: fromRoot(".cache"),
    MACRO_PATH: fromRoot("macros"),
    CORE_PATH: fromRoot("scripty_core"),
    CLASS_PATH: fromRoot("scripty_classes"),
    MODULE_PATH: fromRoot("scripty_modules"),
    EXTERNALS_PATH: fromRoot("externals"),
    USER_CACHE_PATH: Path.Combine(specialFolder("UserProfile"), ".scripty_cache")
  };
  
  function require(id, opts = {}) {
    this.cwd = opts.cwd || env.MODULE_PATH;
    
    let abspath = Path.Combine(this.cwd, id);
    
    if (Boolean(opts.absolute || false)) abspath = id;
    
    const source = File.ReadAllText(abspath);    
    const module = eval(`(function moduleLoader() {
      const module = { exports: {} };
      ${source}
      ;return module;
    })()`);
    
    if (typeof module.exports === "undefined") {
      throw Error(`${abspath} had no exports`);
    }
    
    return module.exports;
  }
  
  const loadCoreModule = m => require(m, { cwd: env.CORE_PATH });
  
  const { createNanoEvents } = loadCoreModule("nano.js");
  const { createContainer } = loadCoreModule("container.js");
  
  const ScriptsPlus = createContainer({ require });
  
  ScriptsPlus.asVal("env", env);
  ScriptsPlus.asVal("events", createNanoEvents());
  ScriptsPlus.loadClasses(env.CLASS_PATH);
  ScriptsPlus.loadModules(env.MODULE_PATH);
  //ScriptsPlus.loadModules(env.EXTERNALS_PATH); 
  ScriptsPlus.loadModules("./scripts_plus", { cwd: env.USER_PROFILE });

  /**
   * This is ScriptsPlusStrokes
   *
   * Everything `$.xxx` for your S+ scripts
   */
  return {
    ...ScriptsPlus,         // Awilix Wrapper
    ...ScriptsPlus.modules, // ScriptsPlus Modules    
    set clipboard(str) {
       clip.SetText(str);
    },
    get clipboard() {
      return clip.GetText();
    },
    get registrations() {
      return Object.keys(ScriptsPlus.container.registrations).sort();
    },
    macro(macroFile, payload) {
      const abspath = Path.Combine(env.MACRO_PATH, `${macroFile}.js`);
      
      (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
    }
  };
}