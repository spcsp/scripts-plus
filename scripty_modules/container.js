class Container {
  constructor({ Awilix, require }) {
    this._awilix = Awilix;
    this._require = require;    
    this._container = this._awilix.createContainer();
  }
  
  get container() {
    return this._container;
  }
  
  get modules() {
    return this.container.cradle;
  }

  get Awilix() {
    return this._awilix = Awilix;
  }
  
  asVal(id, v) { 
    return this._container.register(id, this._awilix.asValue(v));
  }
  
  asClass(id, v) { 
    return this._container.register(id, this._awilix.asClass(v));
  }
  
  asFunc(id, v) { 
    return this._container.register(id, this._awilix.asFunction(v));
  }
  
  asSingle(id, v) { 
    return this._container.register(id, this._awilix.asFunction(v).singleton());
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
      
      if (module) this.asClass(id, this._awilix.asClass(module));
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

module.exports = Container;