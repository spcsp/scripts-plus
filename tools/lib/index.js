const fs = require("fs");
const chokidar = require("chokidar");

const raw = (s) => "String.raw`" + s + "`";
const readFile = (f) => fs.promises.readFile(f, "utf8");

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

async function safeWrite(filepath, content) {
  // const tempFile = filepath + "__atomic_write";

  // if (await fileExists(filepath)) {
  // await fs.promises.writeFile(tempFile, content);
  // }

  await fs.promises.writeFile(filepath, content);
  // await fs.promises.writeFile(tempFile, content);

  // try {
  // await fs.promises.unlink(filepath);
  // await fs.promises.rename(tempFile, filepath);
  // } catch (err) {
  //await fs.promises.unlink(tempFile);
  // } finally {
  // await fs.promises.unlink(tempFile);
  // }
}

module.exports = { fileExists, onCreateOrUpdate, raw, readFile, safeWrite };
