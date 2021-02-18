#!/usr/bin/env node

const { resolve } = require('path');
const execa = require("execa");
const EXE_PATH = String.raw`"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe"`;

const [,,filepath] = process.argv;

async function evalFile(filepath) {
  const src = "eval(File.ReadAllText(String.raw`"+filepath+"`));";
  
  return execa(EXE_PATH, [`--script=${src}`]);
}

if (filepath) {
  const absPath = resolve(process.cwd(), filepath);
  
  if (!filepath.endsWith(".sp.js")) {
    throw Error("This tool is used to run `xxx.sp.js` files through the StrokesPlus Script Engine");
  }
  
  evalFile(absPath);
}
