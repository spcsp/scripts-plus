var { filenameNoExt } = $.apps.mastercam;

$.toClipboard(filenameNoExt);
$.toast(filenameNoExt, "Copied To Clipboard");
