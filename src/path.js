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
  return Path.Exists(p);
}

function join(path1, path2) {
  return Path.Combine(path1, path2);
}

module.exports = {
  exists,
  join,
  toUNC
};