class AppFactory {
  constructor(stdlib) {
    this._stdlib = stdlib;
  }
  
  require(module) {
    return this._stdlib[module];
  }
  
  stdlibProvider(fn) {
    return fn(this._stdlib);
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