function bootstrap(config = {}) {
  const { GetFolderPath, SpecialFolder } = clr.System.Environment;
  const { Directory, File, Path } = clr.System.IO;
  
  const readFile = f => File.ReadAllText(f);
  const pathJoin = (p1, p2) => Path.Combine(p1, p2);
  
  const __dirname = sp.GetStoredString("SCRIPTY_STROKES");
  const __sources = pathJoin(__dirname, "src");
     
  function require(moduleId, opts = {}) {
    const cwd = opts.cwd || __sources;
    
    let abspath = pathJoin(cwd, moduleId);
    
    if (Boolean(opts.absolute || false)) {
      abspath = moduleId;
    }

    const source = readFile(abspath);
    
    const factory = eval(`(function() {
      const module = { exports: {} };

      ${source}

      return module;
    })`);
    
    return factory().exports;
  }
      
  const getFilename = str => str.split(/[\\/]/g).pop().split('.')[0];  
    
  //const IoC = require("core/container.js");
  
  function Container() {
    require("core/awilix.js");

    const getFilename = f => f.split(/[\\/]/g).pop().split('.')[0];

    const getDirContents = dir => {
      try { 
        return Array.from(Directory.GetFiles(dir));
      } catch (err) {
        return [];
      }
    };
    
    const container = Awilix.createContainer();

    const addValue = (id, val) => { 
      container.register(id, Awilix.asValue(val));
      
      return container;
    };
    
    const addFunction = (id, fn) => {
      container.register(id, Awilix.asFunction(fn));
      
      return container;
    };

    const addClass = (id, classDef) => {
      container.register(id, Awilix.asClass(classDef));
      
      return container;
    };
    
    const loadClasses = (dir, { cwd }) => {
      const abspath = pathJoin(cwd, dir);
      const files = getDirContents(abspath);
      
      files.forEach(file => {
        const moduleId = getFilename(file).toLowerCase();
        const theClass = require(file, { absolute: true });
        
        container.register(moduleId, Awilix.asClass(theClass));
      });
      
      return container;
    };
    
    const loadModules = (dir, { cwd }) => {
      const abspath = pathJoin(cwd, dir);
      const files = getDirContents(abspath);
      
      files.forEach(file => {
        const moduleId = getFilename(file);
                
        const factory = eval(`(stdlib => {
          const module = { exports: {} };

          ${File.ReadAllText(file)}

          module.exports["__MODULE_ID"] = "${moduleId}";
          module.exports["__MODULE_SRC"] = String.raw\`${file}\`;

          return module;
        })`);

        addFunction(moduleId, cradle => factory(cradle).exports);
      });
      
      return container;
    };

    return {
      Awilix,
      addClass,
      addFunction,
      addValue,
      container,
      loadClasses,
      loadModules
    };
  }
  
  /**
   * Macro Runner
   */
  function runMacro(macroFile, payload) {
    const abspath = pathJoin(ENV.MACRO_PATH, `${macroFile}.js`);
    
    (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
  }
  
  /**
   * Fill the container!
   */
  const IoC = Container();
  
  IoC.addValue("env", {
    ROOT: __dirname,
    APP_PATH: `${__dirname}\\scripty_apps`,
    MACRO_PATH: `${__dirname}\\scripty_macros`,
    CLASS_PATH: `${__dirname}\\scripty_classes`,
    MODULE_PATH: `${__dirname}\\scripty_modules`,
    HOSTNAME: sp.ExpandEnvironmentVariables("%COMPUTERNAME%"),
    USER_PROFILE_PATH: GetFolderPath(SpecialFolder.UserProfile)
  });
      
  const ENV = IoC.container.resolve("env");
      
  IoC.loadModules("./modules", { cwd: __sources });
  IoC.loadModules("./scripty_strokes", { cwd: ENV.USER_PROFILE_PATH });
  
  IoC.loadClasses("./classes", { cwd: __sources });
  
  const store = require("core/store.js");

  /**
   * Load Apps with stdlib dependencies
   */
   /*
  const appLoader = moduleId => naiveRequire(moduleId, container.cradle);
  const apps = {
    //R: appLoader("R"),
    types: appLoader("types"),
    cimco: appLoader("cimco"),
    //store: appLoader("storage"),
    chrome: appLoader("chrome"),
    scripty: appLoader("scripty"),
    factory: appLoader("factory"),
    "np++": appLoader("notepad++"),
    explorer: appLoader("explorer"),
    //jsdelivr: appLoader("jsdelivr"),
    mastercam: appLoader("mastercam")
  };
*/
  return {
    //apps,
    store,
    macro: runMacro,
    ...IoC.container.cradle,
    container: IoC.container,
    resolve: IoC.container.resolve,
    toClip: str => clip.SetText(str)
    //events: createEmitter(),
  };
}