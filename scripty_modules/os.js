function getHostname() {
  return clr.System.Environment.GetEnvironmentVariable("COMPUTERNAME");
}

module.exports = {
  getHostname
};
