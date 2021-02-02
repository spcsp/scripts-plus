function specialFolder(id) {
  const folder = clr.System.Environment.SpecialFolder[id];
  
  return clr.System.Environment.GetFolderPath(folder);
}

module.exports = specialFolder;