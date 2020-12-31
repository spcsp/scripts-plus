function bootstrap(config = {}) {
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment
  
  const __dirname = sp.GetStoredString("SCRIPTY_STROKES");
  
  const fromRoot = p => Path.Combine(__dirname, p);
  const expandVar = v => sp.ExpandEnvironmentVariables(`%${v}%`);  
  const specialFolder = n => GetFolderPath(SpecialFolder[n]);
  
  const env = {
    ROOT: sp.GetStoredString("SCRIPTY_STROKES"),
    MACRO_PATH: fromRoot("macros"),
    CLASS_PATH: fromRoot("scripty_classes"),
    MODULE_PATH: fromRoot("scripty_modules"),
    HOSTNAME: expandVar("ComputerName"),
    WINDIR: expandVar("WINDIR"),
    SYSTEM_ROOT: expandVar("SystemRoot"),
    APPDATA: expandVar("ApplicationData"),
    LOCAL_APPDATA: expandVar("LocalAppData"),
    USER_PROFILE: specialFolder("UserProfile"),
    LOCAL_APPDATA: specialFolder("LocalApplicationData")
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
  
  /*
  function Container() {
    require("awilix.js");
    const container = Awilix.createContainer();
    const getFilename = f => f.split(/[\\/]/g).pop().split('.')[0];
    const asVal = (id, v) => container.register(id, Awilix.asValue(v));
    const asFunc = (id, v) => container.register(id, Awilix.asFunction(v));
    const asClass = (id, v) => container.register(id, Awilix.asClass(v));
    const asSingle = (id, v) => container.register(id, Awilix.asFunction(v).singleton());
    const getFiles = (dir, { cwd } = {}) => {
      let abspath = dir;
      
      if (typeof cwd === "string") {
        abspath = Path.Combine(cwd, dir);
      }
      
      try {
        return Array.from(Directory.GetFiles(dir))
      } catch(err) {
        return [];
      }
    }
    
    const loadClasses = (...args) => {
      getFiles(...args).forEach(file => {
        const id = getFilename(file).toLowerCase();
        const theClass = require(file, { absolute: true });
        
        asClass(id, theClass);
      });
    };
    
    const loadModules = (...args) => {
      getFiles(...args).forEach(file => {
        const id = getFilename(file);
        const source = File.ReadAllText(file);
        const module = evalModule(source);

        if (typeof module.exports.factory === "function") {
          asFunc(id, cradle => module.exports.factory(cradle));
        } else {
          asFunc(id, () => module.exports);
        }
      });
    };

    return {
      asVal,
      asFunc,
      asClass,
      asSingle,
      container,
      loadClasses,
      loadModules,
      getModules: () => container.cradle
    };
  }
  */
  //const Container = require("container.js");
    
  require("awilix.js");
  const Container = require("container.js");
  
  const IoC = new Container({ Awilix, require, evalModule });
  
  IoC.asVal("env", env);
//  IoC.asVal("Awilix", Awilix);
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
    /**
     * Scripty Functions
     */
    macro: (macroFile, payload) => {
      const abspath = Path.Combine(env.MACRO_PATH, `${macroFile}.js`);
      (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
    },
    /**
     * Scripty Setters
     */
    set clip(str) { clip.SetText(str) },
    /**
     * Scripty Getters
     */
    get clip() { return clip.GetText() },
    get env() { return IoC.container.resolve("env") },
    get registrations() { return Object.keys(IoC.container.registrations).sort() }
  };
}