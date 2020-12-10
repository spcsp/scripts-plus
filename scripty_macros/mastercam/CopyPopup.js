var { addToMenu, addToSubMenu, menuItem, show } = $.popup;

var popup = $.popup.create();
var addToMainMenu = $.popup.addToMenu(popup);

var mastercam = menuItem("Mastercam");
var addToDemo = $.popup.addToSubMenu(mastercam);

addToDemo(menuItem("Copy Folder", `$.macro("mastercam/CurrentFolderPathToClipboard")`));
addToDemo(menuItem("Copy Filename", `$.macro("mastercam/CurrentFilenameToClipboard")`));
addToDemo(menuItem("Copy Part Number", `$.macro("mastercam/CurrentPartNumberToClipboard")`));

addToMainMenu(mastercam);
addToMainMenu($.popup.spacer);
addToMainMenu($.popup.cancel);

show(popup);