function bootstrap(config = {}) {
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment
  
  const __dirname = sp.GetStoredString("SCRIPTY_STROKES");
  
  const fromRoot = p => Path.Combine(__dirname, p);
  const expandVar = v => sp.ExpandEnvironmentVariables(`%${v}%`);  
  const specialFolder = n => GetFolderPath(SpecialFolder[n]);
  const USER_PROFILE = specialFolder("UserProfile");
  
  const xClip = {
    set clip(str) { return clip.SetText(str) },
    get clip() { return clip.GetText() }
  };
  
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
    CACHE_PATH: Path.Combine(USER_PROFILE, ".scripty_cache")
  };
  
  function evalModule(source) {
    return eval(`(() => {
      const module = { exports: {} };

      ${source}

      ;return module;
    })()`);
  } 
  
  function require(id, opts = {}) {
    const cwd = opts.cwd || env.MODULE_PATH;
    let abspath = Path.Combine(cwd, id);
    
    if (Boolean(opts.absolute || false)) abspath = id;
    
    const source = File.ReadAllText(abspath);    
    const module = evalModule(source);
    
    return module.exports;
  }
  
  require("awilix.js");
  const Container = require("container.js");
  
  const IoC = new Container({ Awilix, require, evalModule });
  
  IoC.asVal("env", env);
  IoC.asFunc("clip", () => xClip);
  IoC.asSingle("store", () => require("store.js"));
  IoC.loadClasses(env.CLASS_PATH);
  IoC.loadModules(env.MODULE_PATH);
  IoC.loadModules("./scripty_strokes", { cwd: env.USER_PROFILE });

  /**
   * This is ScriptyStrokes
   *
   * Everything `$.xxx` for your S+ scripts
   */
  return {
    ...IoC,         // Awilix Wrapper
    ...IoC.modules, // Scripty Core
    macro: (macroFile, payload) => {
      const abspath = Path.Combine(env.MACRO_PATH, `${macroFile}.js`);
      (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
    },
    get registrations() { return Object.keys(IoC.container.registrations).sort() }
  };
}