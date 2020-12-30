function bootstrap(config = {}) {
  const { GetFolderPath, SpecialFolder } = clr.System.Environment;
  const { Directory, File, Path } = clr.System.IO;
  
  const readFile = f => File.ReadAllText(f);
  const pathJoin = (p1, p2) => Path.Combine(p1, p2);
  
  const __dirname = sp.GetStoredString("SCRIPTY_STROKES");
  const __sources = pathJoin(__dirname, "src");
     
  function require(id, opts = {}) {
    const cwd = opts.cwd || __sources;
    let abspath = pathJoin(cwd, id);
    
    if (Boolean(opts.absolute || false)) abspath = id;
    
    const source = readFile(abspath);    
    const factory = eval(`(function() {
      const module = { exports: {} };

      ${source}

      return module;
    })`);
    
    return factory().exports;
  }
  
  function Container() {
    require("core/awilix.js");
    const container = Awilix.createContainer();
    const getFilename = f => f.split(/[\\/]/g).pop().split('.')[0];
    const getDirContents = dir => {
      try{return Array.from(Directory.GetFiles(dir))}catch(err){return []}
    };
    const value = (id, val) => container.register(id, Awilix.asValue(val));
    const dynamic = (id, fn) => container.register(id, Awilix.asFunction(fn));
    const singleton = (id, fn) => container.register(id, Awilix.asFunction(fn).singleton());
    const loadClasses = (dir, { cwd }) => {
      getDirContents(Path.Combine(cwd, dir)).forEach(file => {
        const id = getFilename(file).toLowerCase();
        const theClass = require(file, { absolute: true });
        
        container.register(id, Awilix.asClass(theClass));
      });
    };
    const loadModules = (dir, { cwd }) => {
      getDirContents(Path.Combine(cwd, dir)).forEach(file => {
        const id = getFilename(file);                
        const factory = eval(`(stdlib => {
          const module = { exports: {} };

          ${File.ReadAllText(file)}

          module.exports["__MODULE_ID"] = "${id}";
          module.exports["__MODULE_SRC"] = String.raw\`${file}\`;

          return module;
        })`);

        container.register(id, Awilix.asFunction(deps => factory(deps).exports));
      });
    };

    return {
      //Awilix,
      value,
      dynamic,
      singleton,
      container,
      loadClasses,
      loadModules,
    };
  }
  
  const env = {
    ROOT: __dirname,
    APP_PATH: `${__dirname}\\scripty_apps`,
    MACRO_PATH: `${__dirname}\\scripty_macros`,
    CLASS_PATH: `${__dirname}\\scripty_classes`,
    MODULE_PATH: `${__dirname}\\scripty_modules`,
    HOSTNAME: sp.ExpandEnvironmentVariables("%COMPUTERNAME%"),
    SYSTEM_ROOT: sp.ExpandEnvironmentVariables("%SystemRoot%"),
    USER_PROFILE: GetFolderPath(SpecialFolder.UserProfile)
  };
  
  //const Container = require("core/container.js");
  
  /**
   * Let's fill the container!
   */
  const IoC = Container();
  
  IoC.value("env", env);
  IoC.singleton("store", () => require("core/store.js"));
  IoC.loadModules("./modules", { cwd: __sources });
  IoC.loadModules("./scripty_strokes", { cwd: env.USER_PROFILE });
  IoC.loadClasses("./classes", { cwd: __sources });

  /**
   * This is ScriptyStrokes
   *
   * Everything `$.xxx` for your S+ scripts
   */
  return {
    /**
     * Awilix Wrapper
     */
    ...IoC,
    
    /**
     * Scripty Core
     */
    ...IoC.container.cradle,
    
    /**
     * Scripty Functions
     */
    toClip: str => clip.SetText(str),
    macro: (macroFile, payload) => {
      const abspath = pathJoin(ENV.MACRO_PATH, `${macroFile}.js`);
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