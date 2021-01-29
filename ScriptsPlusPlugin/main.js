const ScriptsPlus = {};

const req = require.context('./modules', true, /\.js$/);

for (const key of req.keys()) {
  const cleanedKey = key.replace(/\.js$/, "").replace("./", "");
  
  ScriptsPlus[cleanedKey] = req(key);
}

module.exports = ScriptsPlus;