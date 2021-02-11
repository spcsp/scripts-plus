const fs = require("fs");
const chokidar = require("chokidar");

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

async function atomicWrite(filepath, content) {
  const tempFile = filepath + "__atomic_write";

  await fs.promises.writeFile(tempFile, content);
  await fs.promises.unlink(filepath);
  await fs.promises.rename(tempFile, filepath);
}

module.exports = { atomicWrite, onCreateOrUpdate };
