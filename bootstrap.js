function bootstrap(config = {}) {
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment
  
  const __dirname = sp.GetStoredString("SCRIPTY_STROKES");
  const fromRoot = p => Path.Combine(__dirname, p);
  const expandVar = v => sp.ExpandEnvironmentVariables(`%${v}%`);  
  const specialFolder = n => GetFolderPath(SpecialFolder[n]);
  const USER_PROFILE = specialFolder("UserProfile");
  
  const env = {
    // Windows
    USER_PROFILE,
    WINDIR: expandVar("WINDIR"),
    HOSTNAME: expandVar("ComputerName"),
    SYSTEM_ROOT: expandVar("SystemRoot"),
    APPDATA: expandVar("ApplicationData"),
    LOCAL_APPDATA: specialFolder("LocalApplicationData"),
    // Scripty
    CACHE_PATH: fromRoot(".cache"),
    MACRO_PATH: fromRoot("macros"),
    EXTERNALS_PATH: fromRoot("externals"),
    CORE_PATH: fromRoot("scripty_core"),
    CLASS_PATH: fromRoot("scripty_classes"),
    MODULE_PATH: fromRoot("scripty_modules"),
    ROOT: sp.GetStoredString("SCRIPTY_STROKES"),
    USER_CACHE_PATH: Path.Combine(USER_PROFILE, ".scripty_cache")
  };
  
  function require(id, opts = {}) {
    this.cwd = opts.cwd || env.MODULE_PATH;
    
    let abspath = Path.Combine(this.cwd, id);
    
    if (Boolean(opts.absolute || false)) abspath = id;
    
    const source = File.ReadAllText(abspath);    
    const module = eval(`(() => {
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
  Scripty.loadModules(env.MODULE_PATH);
  Scripty.loadModules(env.EXTERNALS_PATH); 
  Scripty.loadClasses(env.CLASS_PATH);
  Scripty.loadModules("./scripty_strokes", { cwd: env.USER_PROFILE });

  /**
   * This is ScriptyStrokes
   *
   * Everything `$.xxx` for your S+ scripts
   */
  return {
    ...Scripty,         // Awilix Wrapper
    ...Scripty.modules, // Scripty Modules    
    set clip(str) {
       clip.SetText(str);
    },
    get clip() {
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