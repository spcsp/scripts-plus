(function() {  
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
    const abspath = Path.Combine(cwd, dir);
    const files = getDirContents(abspath);
    
    files.forEach(file => {
      const moduleId = getFilename(file).toLowerCase();
      const classDef = evalFile(file);
      
      container.register(moduleId, Awilix.asClass());
    });
    
    return container;
  };
  
  const loadModules = (dir, { cwd }) => {
    const abspath = Path.Combine(cwd, dir);
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
});