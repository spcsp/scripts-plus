function bootstrap(config = {}) {
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment
  
  const __dirname = sp.GetStoredString("SCRIPTY_STROKES");
  const fromRoot = p => Path.Combine(__dirname, p);
  const expandVar = v => sp.ExpandEnvironmentVariables(`%${v}%`);  
  const specialFolder = n => GetFolderPath(SpecialFolder[n]);
  
  const env = {
    ROOT: sp.GetStoredString("SCRIPTY_STROKES"),
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
  
  const containerFactory = require("container.js", { cwd: env.CORE_PATH });
  const Scripty = containerFactory({ require });
  
  Scripty.asVal("env", env);
  Scripty.loadClasses(env.CLASS_PATH);
  Scripty.loadModules(env.MODULE_PATH);
  Scripty.loadModules(env.EXTERNALS_PATH); 
  Scripty.loadModules("./scripty_strokes", { cwd: env.USER_PROFILE });

  /**
   * This is ScriptyStrokes
   *
   * Everything `$.xxx` for your S+ scripts
   */
  return {
    ...Scripty,         // Awilix Wrapper
    ...Scripty.modules, // Scripty Modules    
    set clipboard(str) {
       clip.SetText(str);
    },
    get clipboard() {
      return clip.GetText();
    },
    get registrations() {
      return Object.keys(Scripty.container.registrations).sort();
    },
    macro(macroFile, payload) {
      const abspath = Path.Combine(env.MACRO_PATH, `${macroFile}.js`);
      
      (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
    }
  };
}