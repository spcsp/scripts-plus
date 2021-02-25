const execa = require("execa");

const EXE_PATH = String.raw`"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe"`;

const spApi = async (src) => execa(EXE_PATH, [`--script=${src}`]);

spApi.EXE_PATH = EXE_PATH;

spApi.eval = s => spApi(`eval(${s})`);

spApi.reload = () => spApi.eval(`sp.Reload()`);

spApi.settings = () => spApi.eval(`sp.OpenSettings()`);

spApi.evalFile = s => spApi.eval(`File.ReadAllText(${s})`);

spApi.execFile = absPath => {
  spApi.evalFile("String.raw`" + absPath + "`");
}

module.exports = spApi;
