const { Directory, File } = clr.System.IO;

class Fs {
  constructor() {
    //
  }
  
  cp(src, dest, overwrite = false) {
    return File.Copy(src, dest, overwrite);
  }
  
  exists(abspath) {
    return File.Exists(abspath);
  }
  
  mv(src, dest) {
    return File.Move(src, dest);
  }
  
  mkdir(dir) {
    return Directory.CreateDirectory(dir);
  }

  readdir(dir) {
    return Directory.GetFiles(dir);
  }

  writeFile(filepath, content) {
    return File.WriteAllText(filepath, content);
  }
}

module.exports = Fs;
