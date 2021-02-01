function macro(macroFile, payload) {
  const abspath = Path.Combine(env.MACRO_PATH, `${macroFile}.js`);
  
  (data => eval(File.ReadAllText(abspath)))({ abspath, payload });
}

module.exports = macro;