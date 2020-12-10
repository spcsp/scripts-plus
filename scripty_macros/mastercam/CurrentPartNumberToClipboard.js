var { partNumber } = $.apps.mastercam;

$.toClipboard(partNumber);
$.toast(partNumber, "Copied To Clipboard");
