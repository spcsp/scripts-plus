const cache = require("./cache");
const request = require("./request");

class Unpkg {
  constructor() {
    this._client = request.create("https://unpkg.com");
  }

  fetch(pkg, opts = { cache: true }) {
    const unslash = (p) => p.replace("/", "__");

    if (!opts.cache) {
      return this._client(pkg);
    }

    const scopedCache = cache.scoped("unpkg");

    if (!scopedCache.has(unslash(pkg))) {
      const src = this._client(pkg);

      scopedCache.set(unslash(pkg), src);
    }

    return scopedCache.get(unslash(pkg));
  }
}

module.exports = new Unpkg();
