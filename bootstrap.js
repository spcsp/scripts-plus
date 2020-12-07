function bootstrap(ROOT, config) {
  const { Directory, File, Path } = clr.System.IO;
  const { GetFolderPath, SpecialFolder } = clr.System.Environment;
  
  const StringStore = key => sp.GetStoredString(key);
    StringStore.set = (key, val) => sp.StoreString(key, val);
    
  const defaults = {
    toast: {
      textColor: "yellow",
      backgroundColor: "black"
    }
  };
    
  StringStore.set("SCRIPTY_ROOT", ROOT);
  StringStore.set("SCRIPTY_APPS", `${ROOT}/scripty_apps`);
  StringStore.set("SCRIPTY_MACROS", `${ROOT}/scripty_macros`);
  StringStore.set("SCRIPTY_MODULES", `${ROOT}/scripty_modules`);
  StringStore.set("SCRIPTY_CORE", `${StringStore("SCRIPTY_MODULES")}/core`);
  StringStore.set("SCRIPTY_LIB", `${StringStore("SCRIPTY_MODULES")}/lib`);
  StringStore.set("SCRIPTY_USER", `${GetFolderPath(SpecialFolder.UserProfile)}/scripty_strokes`);
  
  sp.StoreObject("SCRIPTY_SETTINGS", Object.assign(defaults, config));    
  
  function __eval(root, moduleId) {
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
  
  const ScriptyPath = [
    StringStore("SCRIPTY_CORE"),
    StringStore("SCRIPTY_LIB"),
    StringStore("SCRIPTY_USER"),
    StringStore("SCRIPTY_APPS")
  ];
  
  const loaders = {
    lib: moduleId => __eval(StringStore("SCRIPTY_LIB"), moduleId),
    app: moduleId => __eval(StringStore("SCRIPTY_APPS"), moduleId),
    core: moduleId => __eval(StringStore("SCRIPTY_CORE"), moduleId),
    user: moduleId => __eval(StringStore("SCRIPTY_USER"), moduleId)
  };
  
  const resolve = loaders.core("resolve");
  
  function require(moduleId, dependencies = {}) {
    const file = resolve(moduleId);
        
    if (file.error) {
      return sp.MessageBox(`${moduleId} failed to load.`, "ScriptyStrokes require() ERROR");
    }
  
    const SRC = `function moduleLoader(stdlib) {
      const module = { exports: {} };
      
      ${file.data}
      
      module.exports["__MODULE_ID"] = "${moduleId}";
      module.exports["__MODULE_SRC"] = String.raw\`${file.abspath}\`;
      
      return module;
    }`;
        
    var newModule = eval("("+SRC+")")(dependencies);
        
    return newModule.exports;
  }
  
  require.resolve = moduleId => resolve(moduleId).abspath || undefined;
  
  Object.defineProperty(require, "PATH", {
    value: ScriptyPath,
    writable: false
  });

  /**
   * Build up the StdLib
   */
  const stdlib = {
    fs: require("fs"),
    fp: require("fp"),
    os: require("os"),
    env: require("env"),
    exec: require("exec"),
    path: require("path"),
    date: require("date"),
    toast: require("toast"),
    alert: require("alert"),
    timer: require("timer"),
    utils: require("utils"),
    popup: require("popup"),
    macros: require("macros"),
    window: require("window"),
    system: require("system"),
    balloon: require("balloon"),
    regedit: require("regedit"),
    request: require("request"),
    keyboard: require("keyboard"),
    inspector: require("inspector"),
    formation: require("formation")
  };
    
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

  class EventEmitter {
    constructor(events = []) {
      this.events = new Map(events);
    }

    on(name, cb) {
      this.events.set(name, [...(this.events.get(name) || []), cb])
      return () => this.events.set(name, this.events.get(name).filter(fn => fn !== cb))
    }

    emit(name, ...args) {
      return this.events.has(name) && this.events.get(name).map(fn => fn(...args))
    }
  }
  
  const ScriptyStrokes = {
    apps,
    require,
    ...stdlib,
    popupCallback: [],
    store: StringStore,
    events: new EventEmitter(),
    core: {
      getRoot: () => ROOT,
      getSettings: () => sp.GetStoredObject("SCRIPTY_SETTINGS")
    },
    test: () => stdlib.alert("yus!")
  };
  
  ScriptyStrokes.events.on("OPEN_SETTINGS", () => sp.OpenSettings());
  
  return ScriptyStrokes;
}