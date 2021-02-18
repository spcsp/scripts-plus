const execa = require("execa");

const EXE_PATH = String.raw`"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe"`;

const sp = async (src) => execa(EXE_PATH, [`--script=${src}`]);

sp.eval = s => sp(`eval(${s});`);

sp.readFile = s => sp.eval(`File.ReadAllText(${s})`);

sp.exec = absPath => sp.readFile("String.raw`" + absPath + "`");

module.exports = sp;