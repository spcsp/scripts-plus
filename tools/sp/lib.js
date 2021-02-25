const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const parseJson = require("parse-json");

const readFile = filepath => fs.promises.readFile(filepath, "utf8");
const writeFile = (filepath, content) => fs.promises.writeFile(filepath, content);

async function fileExists(fp) {
  try {
    await fs.promises.stat(fp);
    return true;
  } catch (err) {
    return false;
  }
}

async function onCreateOrUpdate(filepath, callback) {
  const watcher = chokidar.watch(filepath, { persistent: true });

  let eventToWatch = "change";

  try {
    await fs.promises.stat(filepath);
  } catch (err) {
    eventToWatch = "add";
  }

  watcher.on(eventToWatch, async () => {
    await watcher.close();

    callback(filepath);
  });
}


module.exports = {
  fileExists,
  onCreateOrUpdate,
  readFile,
  writeFile
};
