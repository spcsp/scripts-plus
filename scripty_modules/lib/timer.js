class Timer {
  constructor() {
    this._id = 0;
  }
  
  getId() {
    return `__timerID${this._id++}`;
  }
  
  factory(opts) {
    const interval = opts.interval || -1;
    const initDelay = opts.initDelay || 0;
    
    return (id, script) => this.create(id, initDelay, interval, script);
  }
  
  /**
   * Eval a given script after a delay
   */
  setTimeout(script, delay) {
    const timerId = this.getId();
    
    return this.create(timerId, delay, -1, `${script};sp.DeleteTimer("${timerId}");`);
  }
  
  /**
   * Eval a script on an interval
   *
   * Returns a function that will delete/cancel the running timer
   */
  setInterval(script, interval) {    
    const timerId = this.getId();
    
    this.create(timerId, 0, interval, script);
    
    return () => sp.DeleteTimer(timerId);
  }
    
  create(timerId, initDelay = 0, interval = -1, script) {
    return sp.CreateTimer(timerId, initDelay, interval, script);
  }
  
  get(id){
    return sp.GetTimer(id);
  }
  
  getScript(id) {
    return sp.GetTimerScript(id);
  }
  
  delete(id){
    sp.DeleteTimer(id);
  }
  
  deleteAll(){
    sp.DeleteAllTimers();
  }
}

module.exports = new Timer();