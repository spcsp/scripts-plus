class Container {
  constructor({ require }) {
    require("awilix.js", { cwd: env.CORE_PATH });
    
    this._require = require;    
    this._awilix = Awilix;
    
    this.container = this._awilix.createContainer();
  }
  
  get modules() {
    return this.container.cradle;
  }

  get Awilix() {
    return this._awilix = Awilix;
  }
  
  asVal(id, v) { 
    return this.container.register(id, this._awilix.asValue(v));
  }
    
  asFunc(id, v) { 
    return this.container.register(id, this._awilix.asFunction(v));
  }
  
  asSingle(id, v) { 
    return this.container.register(id, this._awilix.asFunction(v).singleton());
  }
  
  getModules(...args) {
    return this._getFiles(...args).reduce((modules, file) => {
      const module = this._require(file, { absolute: true });
      
      if (module) {
        modules.push({
          module,
          name: this._getFilename(file)
        });
      }
      
      return modules;
    }, []);
  }
    
  loadModules(...args) {
    this._getFiles(...args).forEach(file => {
      const id = this._getFilename(file);
      const module = this._require(file, { absolute: true });
            
      if (module) this.asVal(id, module);
    });
  }
  
  loadClasses(...args) {
    this._getFiles(...args).forEach(file => {
      const id = this._getFilename(file).toLowerCase();
      const module = this._require(file, { absolute: true });
      
      if (module) {
        const moduleDefinition = {
          [id]: this._awilix.asClass(module).singleton()
        };
        
        if (typeof module.aliasTo === "string") {
          moduleDefinition[module.aliasTo] = this._awilix.aliasTo(id);
        }
        
        this.container.register(moduleDefinition);
      }
    });
  }
  
  _getFilename(f) { 
    return f.split(/[\\/]/g).pop().split('.')[0];
  }
  
  _getFiles(dir, { cwd } = {}) {
    let abspath = dir;
    
    if (typeof cwd === "string") {
      abspath = Path.Combine(cwd, dir);
    }
    
    try {
      return Array.from(Directory.GetFiles(dir))
    } catch(err) {
      return [];
    }
  }
}

const createContainer = args => new Container(args);

module.exports = { createContainer };