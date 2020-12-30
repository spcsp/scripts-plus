class Command {
  constructor({ exec }) {
    exec.alias("git", String.raw`C:\Program Files\Git\git-bash.exe`);
  }
  
  openConsole(path) {
    exec.run("git", [String.raw`--cd="${path}"`]);
  }
}

module.exports = Command;