function requireFactory(resolve) {
  return function require(moduleId, dependencies = {}) {
    const file = resolve(moduleId);
        
    if (file.error) {
      return sp.MessageBox(`${moduleId} failed to load.`, "ScriptyStrokes require() ERROR");
    }

    const SRC = `function loader(stdlib) {
      const module = { exports: {} };
      
      ${file.data}
      
      module.exports["__MODULE_ID"] = "${moduleId}";
      module.exports["__MODULE_SRC"] = "${file.abspath}";
      
      return module;
    }`;
    
    debug(`Evaluating`);
    
    var newModule = eval("("+SRC+")")(dependencies);
        
    return newModule.exports;
  }

  require.resolve = moduleId => resolve(moduleId).abspath || undefined;

  Object.defineProperty(require, "root", {
    value: StringStore("SCRIPTY_LIB"),
    writable: false
  });
}