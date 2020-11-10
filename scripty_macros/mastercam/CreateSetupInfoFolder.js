var { apps, fs } = ScriptyStrokes();

var { explorer, mastercam } = apps;

var setupFolder = explorer.mapUNCpath(`${mastercam.currentPath}SETUP_INFO`);

fs.mkdir(setupFolder);