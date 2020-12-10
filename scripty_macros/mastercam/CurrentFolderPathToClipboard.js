var { currentPath } = $.apps.mastercam;

$.toClipboard(currentPath);
$.toast(currentPath, "Copied To Clipboard");
