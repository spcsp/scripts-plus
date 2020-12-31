function unpkg({ request }) {
  return request.create("https://unpkg.com");
};

module.exports.factory = unpkg;