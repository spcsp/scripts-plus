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
    ROOT: sp.GetStoredString("SCRIPTY_STROKES"),
    MACRO_PATH: fromRoot("macros"),
    CLASS_PATH: fromRoot("scripty_classes"),
    MODULE_PATH: fromRoot("scripty_modules"),
    SCRIPTY_CACHE_PATH: fromRoot(".cache"),
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
   
  function macro(macroFile, payload) {
    const abspath = Path.Combine(env.MACRO_PATH, `${macroFile}.js`);
    
    (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
  }
    
  require("awilix.js");
  
  const Container = require("container.js");
  sp.MessageBox
  const IoC = new Container({ Awilix, require });
  
  IoC.asVal("env", env);
  IoC.loadModules(env.MODULE_PATH);
  IoC.loadModules("./scripty_strokes", { cwd: env.USER_PROFILE });
  IoC.loadClasses(env.CLASS_PATH);

  /**
   * This is ScriptyStrokes
   *
   * Everything `$.xxx` for your S+ scripts
   */
  return {
    macro,          // Macro Runner
    ...IoC,         // Awilix Wrapper
    ...IoC.modules, // Scripty Core    
    set clip(str) {
       clip.SetText(str);
    },
    get clip() {
      return clip.GetText();
    },
    get registrations() {
      return Object.keys(IoC.container.registrations).sort();
    }
  };
}