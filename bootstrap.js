function bootstrap(config = {}) {
  const configDefaults = {
    toast: {
      textColor: "yellow",
      backgroundColor: "black"
    }
  };
  
  function init(__dirname, { env, mem }) {    
    const { Directory, File, Path } = clr.System.IO;
    const { GetFolderPath, SpecialFolder } = clr.System.Environment;
    
    mem.set("SETTINGS", {...configDefaults, ...config});    
    
    env.set("ROOT", __dirname);
    env.set("APPS_PATH", `${__dirname}/scripty_apps`);
    env.set("MACROS_PATH", `${__dirname}/scripty_macros`);
    env.set("MODULES_PATH", `${__dirname}/scripty_modules`);
    env.set("USER_MODULES_PATH", `${GetFolderPath(SpecialFolder.UserProfile)}/scripty_strokes`);
    
    function evalFactory(root) {
      return (moduleId) => {
        try {
          const contents = File.ReadAllText(Path.Combine(root, `${moduleId}.js`));
          
          if (contents.startsWith("(")) {
            return eval(contents);
          } else {
            return eval(`(${contents})`);
          }
        } catch (err) {
          sp.MessageBox(`ERROR: ${err}`, "ScriptyStrokes __eval() Error");
        }
      }      
    }
    
    function resolve(moduleId) {
      this.PATH = [
        env.get("APPS_PATH"),
        env.get("MODULES_PATH"),
        env.get("USER_MODULES_PATH")
      ];
      
      for (const dir of this.PATH) {
        //const abspath = Path.Combine(dir, `${moduleId}.js`).replace(/\\/g, "/").replace(/\//g, "\\\\");
        const abspath = Path.Combine(dir, `${moduleId}.js`);
        
        //sp.MessageBox(abspath,"");
        
        if (File.Exists(abspath)) {
          const data = File.ReadAllText(abspath);
          
          if (data) {
            return { data, abspath, error: false };
          }
        }
      }
      
      sp.MessageBox(
        `"${moduleId}" was not found in the ScriptyPath.\n\n${this.PATH.join("\n")}`,
        "ScriptyStrokes __resolve() ERROR"
      );
      
      return {
        error: `"${moduleId}" was not found in the ScriptyPath.\n\n${this.PATH.join("\n")}`
      };
    }
    
    function require(moduleId, dependencies = {}) {
      const file = resolve(moduleId);
          
      if (file.error) {
        return sp.MessageBox(file.error, "ScriptyStrokes require() ERROR");
      }
    
      const SRC = `(function moduleLoader(stdlib) {
        const module = { exports: {} };
        
        ${file.data}
        
        module.exports["__MODULE_ID"] = "${moduleId}";
        module.exports["__MODULE_SRC"] = String.raw\`${file.abspath}\`;
        
        return module;
      })`;
      
      var newModule = eval(SRC)(dependencies);
          
      return newModule.exports;
    }
        
    /**
     * Build up the StdLib
     */
    const stdlib = [
      "fs",
      "fp",
      "os",
      "env",
      "exec",
      "path",
      "date",
      "toast",
      "alert",
      "timer",
      "utils",
      "popup",
      "window",
      "system",
      "balloon",
      "regedit",
      "request",
      "keyboard",
      "inspector",
      "formation"
    ].reduce((modules, module) => {
      modules[module] = require(module);
      
      return modules;
    }, {});
    
    /**
     * Macro Runner
     */
    function runMacro(macroFile) {
      const abspath = Path.Combine(env.get("MACROS_PATH"), `${macroFile}.js`);
      
      return eval(File.ReadAllText(abspath));
    }
    
    /**
     * Load Apps with stdlib dependencies
     */
    const appLoader = moduleId => require(moduleId, stdlib);
    const apps = {
      git: appLoader("gfw"),
      cimco: appLoader("cimco"),
      chrome: appLoader("chrome"),
      calc: appLoader("calculator"),
      factory: appLoader("factory"),
      "np++": appLoader("notepad++"),
      explorer: appLoader("explorer"),
      jsdelivr: appLoader("jsdelivr"),
      mastercam: appLoader("mastercam")
    };
/*
    const createEmitter = require("core/event-emitter");
    stdlib.alert(createEmitter.__MODULE_SRC);
    createEmitter();
*/  
    const ScriptyStrokes = {
      app: appLoader,
      appFactory: appLoader("factory"),
      resolve,
      require,
      ...stdlib,
      macro: runMacro,
      //events: createEmitter(),
      getRoot: () => env.get("ROOT"),
      getSettings: () => mem.get("SETTINGS"),
      apps,
    };
    
    return ScriptyStrokes;
  }
  
  const env = {
    get: (k) => sp.GetStoredString(`SCRIPTY_${k}`),
    set: (k, v) => sp.StoreString(`SCRIPTY_${k}`, v)
  };
  
  const mem = {
    get: (k) => sp.GetStoredObject(`SCRIPTY_${k}`),
    set: (k, v) => sp.StoreObject(`SCRIPTY_${k}`, v)
  };
  
  return init(env.get("ROOT"), { env, mem });
}