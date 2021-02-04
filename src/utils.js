module.exports.sleep = (n) => sp.Sleep(n);
module.exports.stripOpNum = (f) => f.replace(/_(op|OP)[0-9]/, "");
module.exports.backslash = (i) => i.replace(/\//g, "\\\\");
