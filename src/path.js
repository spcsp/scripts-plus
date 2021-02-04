function join(path1, path2) {
  return path1 + "\\" + path2;
}

function toUNC(abspath) {
  if (abspath.startsWith("Z")) {
    return abspath.replace(/^Z\:/, "\\\\hbdatavm\\cnc");
  } else if (abspath.startsWith("V")) {
    return abspath.replace(/^V\:/, "\\\\hbdatavm\\cnc\\Program Vault");
  } else {
    return abspath;
  }
}

function exists(p) {
  return clr.System.IO.Path.Exists(p);
}

module.exports = {
  exists,
  join,
  toUNC,
};
