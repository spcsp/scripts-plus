class Path {
  toUNC(abspath) {
    if (abspath.startsWith("Z")) {
      return abspath.replace(/^Z\:/, "\\\\hbdatavm\\cnc");
    } else if (abspath.startsWith("V")) {
      return abspath.replace(/^V\:/, "\\\\hbdatavm\\cnc\\Program Vault");
    } else {
      return abspath;
    }
  }
  
  join(path1, path2) {
    return clr.System.IO.Path.Combine(path1, path2);
  }
}

module.exports = new Path();
