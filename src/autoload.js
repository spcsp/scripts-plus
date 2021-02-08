function autoload(dir) {
  const files = clr.System.IO.Directory.GetFiles(dir);
  
  const modules = {};
  
  files.forEach(filepath => {
    const filename = filepath.split("\\").pop().replace(".js", "");
    const contents = clr.System.IO.File.ReadAllText(filepath);
    const module = eval(`(() => {
      const module = { exports: {} }; 
      const __filename = String.raw\`${filepath}\`;
      
    
      ${contents}
      
      ;return module;
    })()`);
    
    modules[filename] = module.exports;
  });
  
  return modules;
}

module.exports = autoload;
