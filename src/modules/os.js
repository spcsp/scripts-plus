class Os {
  getHostname() {
    return clr.System.Environment.GetEnvironmentVariable("COMPUTERNAME");
  }
}

module.exports = new Os();
