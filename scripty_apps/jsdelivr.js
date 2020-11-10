function jsdelivr({ request }) {
  const BASE_URL = "https://cdn.jsdelivr.net/npm/";
    
  return pkg => {
    const module = {};
    const fetch = request.factory(BASE_URL);
    
    return eval(fetch(pkg));
  };
}

module.exports = jsdelivr;