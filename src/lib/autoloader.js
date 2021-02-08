const loadModule = require("./loadModule");

const fs = require("../fs");

function autoloader(dir) { 
  return fs.readdir(dir).reduce((modules, filepath) => {
    const module = loadModule(filepath);
    
    modules[module.__filename] = module.exports;
    
    return modules;
  }, {});
}

module.exports = autoloader;
