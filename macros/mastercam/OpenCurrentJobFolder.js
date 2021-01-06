$.toast($.mastercam.currentPath, {
  title: `Opening Job Folder for ${$.mastercam.partNumber}`
});

$.explorer.open(explorer.mapUNCpath($.mastercam.currentPath));