const fs = require("fs");
const chokidar = require("chokidar");

const raw = (str) => "String.raw`" + str + "`";

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
  const tempFile = filepath + "__atomic_write";

  await fs.promises.writeFile(tempFile, content);

  try {
    await fs.promises.unlink(filepath);
    await fs.promises.rename(tempFile, filepath);
  } catch (err) {
    await fs.promises.unlink(tempFile);
  }
}

module.exports = { fileExists, onCreateOrUpdate, raw, safeWrite };
