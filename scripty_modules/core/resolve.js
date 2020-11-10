function resolve(moduleId) {
  for (const dir of ScriptyPath) {
    const abspath = Path.Combine(dir, `${moduleId}.js`).replace(/\\/g, "/").replace(/\//g, "\\\\");
    
    if (File.Exists(abspath)) {
      const data = File.ReadAllText(abspath);
      
      if (data) {
        return { data, abspath };
      }
    }
  }
  
  sp.MessageBox(
    `"${moduleId}" was not found in the ScriptyPath.\n\n${ScriptyPath.join("\n")}`,
    "ScriptyStrokes __resolve() ERROR"
  );
}
  