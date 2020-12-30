(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Container = function(){}));
}(this, (function (exports) { 'use strict';
  require("core/awilix.js");
  
  const getFilename = f => f.split(/[\\/]/g).pop().split('.')[0];
  const getDirContents = dir => {
    try{return Array.from(Directory.GetFiles(dir))}catch(err){return []}
  };
  
  const container = Awilix.createContainer();
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

  exports.value = value;
  exports.dynamic = dynamic;
  exports.singleton = singleton;
  exports.container = container;
  exports.loadClasses = loadClasses;
  exports.loadModules = loadModules;
    
  Object.defineProperty(exports, '__esModule', { value: true });

})));