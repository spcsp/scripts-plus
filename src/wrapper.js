class Engine {
  get wrapper() {
    return __spEngineWrapper;
  }

  get current() {
    return this.wrapper.Engine;
  }

  get previous() {
    return sp.EngineList().Last().Engine;
  }

  sameAsLast(cb) {
    if (this.current.Name == this.previous.Name) {
      cb();
    }
  }
}

module.exports = Engine;
