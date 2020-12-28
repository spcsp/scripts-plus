/* global __dirname */

function Container() {
  eval(fs.readFile(path.join(__dirname, `awilix.js`)));

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
    // Auto-load our services and our repositories.
    const opts = 
    container.loadModules(globs, {
      // We want ClassicalService to be registered as classicalService.
      formatName: 'camelCase',
      cwd: __dirname,
    });
    
    return container;
  };

  return {
    container,
    addValue,
    addClass,
    addModule
  };
}