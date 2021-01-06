class Container {
  get container() {
    return this._container;
  }
  
  get modules() {
    return this.container.cradle;
  }
  
  constructor({ Awilix, evalModule, require }) {
    this._awilix = Awilix;
    this._require = require;
    this._evalModule = evalModule;
    this._container = this._awilix.createContainer();
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
  
  loadClasses(...args) {
    this._getFiles(...args).forEach(file => {
      const id = this._getFilename(file).toLowerCase();
      const theClass = this._require(file, { absolute: true });
      
      this._container.register(id, this._awilix.asClass(theClass).singleton());
    });
  }
  
  loadModules(...args) {
    this._getFiles(...args).forEach(file => {
      const id = this._getFilename(file);
      const source = File.ReadAllText(file);
      const module = this._evalModule(source);

      if (typeof module.exports.factory === "function") {
        this.asFunc(id, cradle => module.exports.factory(cradle));
      } else {
        this.asFunc(id, () => module.exports);
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

module.exports = Container;