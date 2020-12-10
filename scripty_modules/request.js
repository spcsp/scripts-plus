function getClientHandler() {
  var httpHandler = new HttpClientHandler();
  
  httpHandler.AutomaticDecompression = host.flags(
    DecompressionMethods.GZip,
    DecompressionMethods.Deflate
  );
  
  return httpHandler;
}

function queryString(obj) {
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
}

function request(url, params) {
  var httpHandler = getClientHandler();
  var client = new HttpClient(httpHandler);
  var endpoint = params ? `${url}?${queryString(params)}` : url;
  var response = client.GetAsync(endpoint).Result;
  var result = response.Content.ReadAsStringAsync().Result;

  httpHandler.Dispose();
  client.Dispose();

  return result;
}

request.factory = baseUrl => {
  var httpHandler = getClientHandler();
  var client = new HttpClient(httpHandler);
  
  client.BaseAddress = new Uri(baseUrl);

  return (url, params) => {
    var endpoint = params ? `${url}?${queryString(params)}` : url;
    var response = client.GetAsync(endpoint).Result;
    var result = response.Content.ReadAsStringAsync().Result;

    httpHandler.Dispose();
    client.Dispose();

    return result;
  };
}
  
module.exports = request;
