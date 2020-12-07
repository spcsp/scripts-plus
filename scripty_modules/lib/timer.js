class Timer {
  constructor() {
    this._id = 0;
  }
  
  getId() {
    return this._id++;
  }
  
  factory(opts) {
    const interval = opts.interval || -1;
    const initDelay = opts.initDelay || 0;
    
    return (id, script) => this.create(id, initDelay, interval, script);
  }
  
  setTimeout(script, delay) {
    const id = `__scripty_timeout:${this.getId()}`;
    
    return this.create(id, delay, -1, `${script};sp.DeleteTimer("${id}");`);
  }
    
  create(id, initDelay = 0, interval = -1, script) {
    return sp.CreateTimer(id, initDelay, interval, script);
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