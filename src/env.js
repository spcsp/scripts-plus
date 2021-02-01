const { Directory, File, Path } = clr.System.IO;
const { GetFolderPath, SpecialFolder } = clr.System.Environment

const expand = v => sp.ExpandEnvironmentVariables(`%${v}%`);  
const specialFolder = n => GetFolderPath(SpecialFolder[n]);

const env = {
  USER_PROFILE: specialFolder("UserProfile"),
  WINDIR: expand("WINDIR"),
  HOSTNAME: expand("ComputerName"),
  SYSTEM_ROOT: expand("SystemRoot"),
  APPDATA: expand("ApplicationData"),
  LOCAL_APPDATA: specialFolder("LocalApplicationData"),
  CACHE_PATH: Path.Combine(specialFolder("UserProfile"), ".scripty_cache")
};

module.exports = {
  ...env,
  expand,
  specialFolder
};
