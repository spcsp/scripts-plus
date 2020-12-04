class AppFactory {
  constructor(stdlib) {
    this._stdlib = stdlib;
  }
    
  using(fn) {
    return fn(this._stdlib);
  }
  
  require(module) {
    return this._stdlib[module];
  }
  
  create(exe) {
    const app = {
      open(...args) {
        return sp.RunProgram(
          exe,
          args.map(a => `"${a}"`).join(" "),
          'open',
          'normal',
          true,
          false,
          false
        );
      }
    };
    
    return app;
  }
}

module.exports = new AppFactory(stdlib);