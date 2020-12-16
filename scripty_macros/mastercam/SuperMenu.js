const M = $.apps.mastercam;

function McamFilesSubMenu() {
  const subMenu = $.popup.menuItem(`Mcam Files (${M.camFiles.length})`);
  const addEntry = $.popup.addToSubMenu(subMenu);

  M.camFiles.forEach(f => {
    addEntry($.popup.menuItem(f, "$.apps.mastercam.open(String.raw`"+f+"`)"));
  });
  
  return subMenu;
}

function NcFilesSubMenu() {
  const subMenu = $.popup.menuItem(`Nc Files (${M.ncFiles.length})`);
  const addEntry = $.popup.addToSubMenu(subMenu);
  
  M.ncFiles.forEach(f => {
    addEntry($.popup.menuItem(f, "$.apps.cimco.open(String.raw`"+f+"`)"));
  });
  
  return subMenu;
}

if (M.windowTitle === "Mastercam Design 2019") {
  $.popup([
    $.popup.menuItem(`Open a file first`),
  ]);
} else {
  $.popup([
    //$.popup.menuItem(`Open ${ncfile}.NC`, `$.macro("mastercam/OpenMatchingNCFile")`),
    $.popup.menuItem(`Edit This NC File`, `$.macro("mastercam/OpenMatchingNCFile")`),
    $.popup.spacer,
    $.popup.menuItem("Copy Job Path", `$.macro("mastercam/CurrentFolderPathToClipboard")`),
    $.popup.menuItem("Copy Part Number", `$.macro("mastercam/CurrentPartNumberToClipboard")`),
    $.popup.menuItem("Copy Filename", `$.macro("mastercam/CurrentFilenameToClipboard")`),
    $.popup.spacer,
    McamFilesSubMenu(),
    NcFilesSubMenu(),
    $.popup.menuItem("Open Job Folder", `$.macro("mastercam/OpenCurrentJobFolder")`),
    $.popup.spacer,
    $.popup.cancel,
  ]);
}