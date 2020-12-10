var { cimco, mastercam } = $.apps;

var path = mastercam.abspath.replace(/\.[^\/.]+$/, ".NC")

$.toast(path, "Opening NC file");

cimco.activate();

sp.SendKeys("^o");
sp.Sleep(200);
sp.SendString(path);
sp.Sleep(20);
sp.SendKeys("{ENTER}");