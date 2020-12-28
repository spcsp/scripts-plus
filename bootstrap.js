function bootstrap(config = {}) {
  const __dirname = sp.GetStoredString("SCRIPTY_ROOT");
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment;

  const configDefaults = {
    toast: {
      textColor: "yellow",
      backgroundColor: "black"
    }
  };

  const getFilename = (filepath) => filepath.split(/[\\/]/g).pop().split('.')[0];

  const env = (k, v) => {
    if (typeof v === "undefined") {
      return sp.GetStoredString(`SCRIPTY_${k}`);
    } else {
      sp.StoreString(`SCRIPTY_${k}`, v);
    }
  };

  const mem = (k, v) => {
    if (typeof v === "undefined") {
      return sp.GetStoredObject(`SCRIPTY_${k}`);
    } else {
      sp.StoreObject(`SCRIPTY_${k}`, v);
    }
  };

  function resolve(moduleId) {
    this.PATH = [
      env("APPS_PATH"),
      env("MODULES_PATH"),
      env("USER_MODULES_PATH")
    ];

    for (const dir of this.PATH) {
      const abspath = Path.Combine(dir, `${moduleId}.js`);

      if (env("SETTINGS").debug) {
        sp.MessageBox(abspath, "DEBUG:resolve");
      }

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

  function naiveRequire(moduleId, dependencies = {}) {
    const file = resolve(moduleId);

    if (file.error) {
      return sp.MessageBox(file.error, "ScriptyStrokes naiveRequire() ERROR");
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
  
  function Container() {
    eval(File.ReadAllText(Path.Combine(__dirname, `awilix.js`)));

    const container = Awilix.createContainer();

    const addValue = (id, val) => { 
      container.register(id, Awilix.asValue(val));
      
      return container;
    };

    const addModule = (id) => {
      const module = naiveRequire(id);
      
      container.register(id, Awilix.asFunction(() => module));
      
      return container;
    };

    const addClass = (id) => {
      const module = naiveRequire(id);
      
      container.register(id, Awilix.asClass(module));
      
      return container;
    };

    const loadModules = globs => {
      container.loadModules(globs, {
        formatName: 'camelCase',
        cwd: __dirname,
      });
      
      return container;
    };

    return {
      Awilix,
      addClass,
      addModule,
      addValue,
      container,
      loadModules
    };
  }

  function init(__dirname) {
    const { container, addValue } = Container();

    addValue("ROOT", __dirname);
    
    env("ROOT", __dirname);
    env("APPS_PATH", `${__dirname}\\scripty_apps`);
    env("MACROS_PATH", `${__dirname}\\scripty_macros`);
    env("MODULES_PATH", `${__dirname}\\scripty_modules`);
    env("USER_MODULES_PATH", `${GetFolderPath(SpecialFolder.UserProfile)}\\scripty_strokes`);

    mem("SETTINGS", {...configDefaults, ...config});

    /**
     * Build up the StdLib
     */
    const stdModules = new Array();
    const moduleLocations = Directory.GetFiles(env("MODULES_PATH"));
    moduleLocations.forEach(m => stdModules.push(getFilename(m)));

    const stdlib = stdModules.reduce((modules, module) => {
      modules[module] = naiveRequire(module);

      return modules;
    }, {});

    /**
     * Macro Runner
     */
    function runMacro(macroFile, payload) {
      const abspath = Path.Combine(env("MACROS_PATH"), `${macroFile}.js`);
      (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
    }

    /**
     * Container()
     */
    //eval(File.ReadAllText(Path.Combine(env("ROOT"), `container.js`)));

    /**
     * Load Apps with stdlib dependencies
     */
    const appLoader = moduleId => naiveRequire(moduleId, stdlib);
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

    const ScriptyStrokes = {
      apps,
      container,
      core: {
        env,
        mem,
        resolve,
        require: naiveRequire
      },
      ...stdlib,
      macro: runMacro,
      toClip: str => clip.SetText(str)
      //events: createEmitter(),
    };

    //this.store = appLoader("storage");

    return ScriptyStrokes;
  }

  return init(env("ROOT"));
}