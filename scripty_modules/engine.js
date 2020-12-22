class Engine {
  get current() {
    return __spEngineWrapper.Engine;
  }

  get previous() {
    return sp.EngineList().Last().Engine;
  }
  
  thisEqualsLast(cb) {
    if (this.current.Name == this.previous.Name) {
      cb();
    }
  }
}

module.exports = new Engine();
