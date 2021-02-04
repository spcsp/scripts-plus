const JSON = require("./json");

const { Headers, HttpClient } = http.System.Net.Http;

class Api {
  constructor() {
    this.client = new HttpClient();
    this.client.BaseAddress = new Uri("http://localhost:3000");
    this.client.DefaultRequestHeaders.Add("User-Agent", "ScriptsPlus");
    this.client.DefaultRequestHeaders.Accept.Add(
      new Headers.MediaTypeWithQualityHeaderValue("application/json")
    );
  }

  get(url) {
    return this._getResult(this.client.GetAsync(url));
  }

  post(url, obj) {
    const response = this.client.PostAsync(url, json.payload(obj));

    return this._getResult(response);
  }

  _getResult(response) {
    return response.Content.ReadAsStringAsync().Result;
  }
}

module.exports = new Api();
