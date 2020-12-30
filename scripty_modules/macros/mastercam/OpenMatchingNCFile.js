var { cimco, mastercam } = $.apps;

var path = mastercam.abspath.replace(/\.[^\/.]+$/, ".NC")

$.toast(path, "Opening NC file");

cimco.open(path);