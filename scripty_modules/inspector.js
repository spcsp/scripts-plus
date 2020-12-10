class Inspector {
  describe(obj) {
    const keys = Object.keys(obj);

    return keys.map(k => `key: ${k}, typeof: ${typeof obj[k]}`).join("\n");
  }
}

module.exports = new Inspector();