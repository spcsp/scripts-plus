const { CreateDirectory, GetFiles } = clr.System.IO.Directory;

class Fs {
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
    return CreateDirectory(dir);
  }

  readdir(dir) {
    return GetFiles(dir);
  }

  readFile(filepath) {
    return File.ReadAllText(filepath);
  }
  
  writeFile(filepath, content) {
    return File.WriteAllText(filepath, content);
  }
}

module.exports = new Fs();
