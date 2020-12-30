class Scripty {
  baseUrl = null;
  
  get remote() {
    return { package: this.getRemotePackage() };
  }
  
  constructor({ request }) {
    this._request = request;
    this.baseUrl = `https://static.hbcnc.shop/Workcenter%20Automation/`;
  }
    
  fetch(uri, params) {
    const client = this._request.factory(this.baseUrl);
    
    return client(uri, params);
  }
  
  getRemotePackage() {
    var pkg = this.fetch("package.json");

    if (pkg) {
      return JSON.parse(pkg);
    }
  }
}

module.exports = new Scripty(stdlib);