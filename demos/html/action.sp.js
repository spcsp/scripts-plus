function evalFile(path) {
  const dirname = path.replace(/\\/g, "/").replace(/\/[^/]*$/, "");
  const contents = File.ReadAllText(path);

  eval("var __dirname=String.raw`" + dirname + "`;" + contents);
}

evalFile(
  String.raw`C:\Users\kevin\projects\scripts-plus-plugin\demos\html\index.sp.js`
);
