var { apps, alert, balloon, keyboard, toast } = ScriptyStrokes();
var { mastercam } = apps;

var wait = () => sp.Sleep(10);

sp.SendKeys("^a");
wait();
sp.SendString(mastercam.filenameNoExt);
wait();
keyboard.tab();
wait();
sp.SendKeys("^a");
wait();
sp.SendString(mastercam.currentPath.replace(/\//g, "\\"));

toast("Updated Title, Path, and Post", mastercam.filename);