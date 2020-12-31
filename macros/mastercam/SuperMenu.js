const M = $.mastercam;

function McamFilesSubMenu(menuEntryText) {
  const subMenu = $.popup.menuItem(menuEntryText);
  const addEntry = $.popup.addToSubMenu(subMenu);

  $.mastercam.camFiles.forEach(f => {
    addEntry($.popup.menuItem(f, "$.apps.mastercam.open(String.raw`"+f+"`)"));
  });
  
  return subMenu;
}

function NcFilesSubMenu(menuEntryText) {
  const subMenu = $.popup.menuItem(menuEntryText);
  const addEntry = $.popup.addToSubMenu(subMenu);
  
  $.mastercam.ncFiles.forEach(f => {
    addEntry($.popup.menuItem(f, "$.apps.cimco.open(String.raw`"+f+"`)"));
  });
  
  return subMenu;
}

if ($.mastercam.windowTitle === "Mastercam Design 2019") {
  $.popup([menuItem(`Open a file first`)]);
} else {
  $.popup([
    menuItem(`Edit This NC File`, `$.macro("mastercam/OpenMatchingNCFile")`),
    spacer(),
    menuItem("Copy Job Path", `$.macro("mastercam/CurrentFolderPathToClipboard")`),
    menuItem("Copy Part Number", `$.macro("mastercam/CurrentPartNumberToClipboard")`),
    menuItem("Copy Filename", `$.macro("mastercam/CurrentFilenameToClipboard")`),
    spacer(),
    McamFilesSubMenu(`Mcam Files (${M.camFiles.length})`),
    NcFilesSubMenu(`Nc Files (${M.ncFiles.length})`),
    //menuItem("Open Job Folder", `$.macro("mastercam/OpenCurrentJobFolder")`),
    spacer(),
    cancel()
  ]);
}