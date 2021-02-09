const json = require("./json");

const { Headers, HttpClient } = http.System.Net.Http;

class Api {
  constructor() {
    this.client = new HttpClient();
    this.client.BaseAddress = new Uri("http://localhost:3000");
    this.client.DefaultRequestHeaders.Add("User-Agent", "ScriptsPlus");
    this.client.DefaultRequestHeaders.Accept.Add(
      new Headers.MediaTypeWithQualityHeaderValue("application/json")
    );
    
    this._result = "";
  }

  get(url) {
    this._result = this.client.GetAsync(url).Result;
    
    return this._getReply();
  }

  post(url, obj) {
    this._result = this.client.PostAsync(url, json.payload(obj)).Result;
    
    return this._getReply();
  }

  _getReply() {
    return this._result.Content.ReadAsStringAsync().Result;
  }
}

module.exports = new Api();
