class Fs {
  constructor({ Directory }) {
    this._dir = Directory;
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
    return this._dir.CreateDirectory(dir);
  }

  readdir(dir) {
    return this._dir.GetFiles(dir);
  }

  readFile(filepath) {
    return File.ReadAllText(filepath);
  }
  
  writeFile(filepath, content) {
    return File.WriteAllText(filepath, content);
  }
}

module.exports = new Fs(clr.System.IO);
