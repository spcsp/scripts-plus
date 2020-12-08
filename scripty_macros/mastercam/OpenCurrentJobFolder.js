var { explorer, mastercam } = $.apps;

toast(mastercam.currentPath, `Opening Job Folder for ${mastercam.partNumber}`);

explorer.open(explorer.mapUNCpath(mastercam.currentPath));