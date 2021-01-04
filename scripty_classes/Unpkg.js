class Unpkg {
  constructor({ cache, request }) {
    this._cache = cache;
    this._client = request.create("https://unpkg.com");
  }
  
  fetch(pkg, opts = { cache: true }) {
    if (!opts.cache) return this._client(pkg);
    
    const scopedCache = $.cache.scoped("unpkg");
    
    if (!scopedCache.has(pkg)) {
      const src = this._client(pkg);
      
      scopedCache.set(pkg, src);
    }
  
    return scopedCache.get(pkg);
  }
};

module.exports = Unpkg;
