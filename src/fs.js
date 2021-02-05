class Fs {
  constructor() {
    //
  }

  cp(src, dest, overwrite = false) {
    return clr.System.IO.File.Copy(src, dest, overwrite);
  }

  exists(abspath) {
    return clr.System.IO.File.Exists(abspath);
  }

  mv(src, dest) {
    return clr.System.IO.File.Move(src, dest);
  }

  mkdir(dir) {
    return clr.System.IO.Directory.CreateDirectory(dir);
  }

  readdir(dir) {
    return clr.System.IO.Directory.GetFiles(dir);
  }

  readFile(filepath) {
    return clr.System.IO.File.ReadAllText(filepath);
  }

  writeFile(filepath, content) {
    return clr.System.IO.File.WriteAllText(filepath, content);
  }
}

module.exports = new Fs();
