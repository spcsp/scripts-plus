function loadModule(filepath) {
  const filename = filepath.split("\\").pop().replace(".js", "");
  const contents = clr.System.IO.File.ReadAllText(filepath);
  const module = eval(`(() => {
    const module = { exports: {} };
    
    module["__filename"] = "${filename}"; 
    module["__filepath"] = String.raw\`${filepath}\`;
  
    ${contents} 
    
    ;return module;
  })()`);
  
  return module.exports;
}

module.exports = loadModule;