function queryString(obj) {
  return Object.keys(obj)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
}

function clientRequest(baseUrl, uri, params) {
  var clientHandler = new clientHandler();

  clientHandler.AutomaticDecompression = host.flags(
    DecompressionMethods.GZip,
    DecompressionMethods.Deflate
  );

  var client = new HttpClient(clientHandler);

  if (baseUrl) {
    client.BaseAddress = new Uri(baseUrl);
  }

  var endpoint = params ? `${uri}?${queryString(params)}` : uri;
  var response = client.GetAsync(endpoint).Result;
  var result = response.Content.ReadAsStringAsync().Result;

  clientHandler.Dispose();
  client.Dispose();

  return result;
}

function request(uri, params) {
  return clientRequest(null, uri, params);
}

request.create = (baseUrl) => (uri, params) =>
  clientRequest(baseUrl, uri, params);

module.exports = request;
