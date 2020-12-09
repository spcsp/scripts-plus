var { addToMenu, addToSubMenu, menuItem, show } = $.popup;

var popup = $.popup.create();
var addToMainMenu = $.popup.addToMenu(popup);

var mastercam = menuItem("Mastercam");
var addToDemo = $.popup.addToSubMenu(mastercam);

addToDemo(menuItem("Copy Folder", `$.macros.run("mastercam/CurrentFolderPathToClipboard")`));
addToDemo(menuItem("Copy Filename", `$.macros.run("mastercam/CurrentFilenameToClipboard")`));
addToDemo(menuItem("Copy Part Number", `$.macros.run("mastercam/CurrentPartNumberToClipboard")`));

addToMainMenu(mastercam);
addToMainMenu($.popup.spacer);
addToMainMenu($.popup.cancel);

show(popup);