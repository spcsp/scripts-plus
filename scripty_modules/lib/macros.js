class Macros {  
  constructor() {
    //
  }
  
  /**
   * Run a macro file from the default location
   */
  run(macroFile) {
    const abspath = Path.Combine(sp.GetStoredString("SCRIPTY_MACROS"), `${macroFile}.js`);
    
    return eval(File.ReadAllText(abspath));
  }
}

module.exports = new Macros();
