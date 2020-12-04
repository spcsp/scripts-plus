var { apps, alert, balloon, keyboard, toast } = ScriptyStrokes();
var { mastercam } = apps;

var wait = () => sp.Sleep(50);

//sp.SendKeys("^a");
keyboard.ctrl("a").type();
wait();
keyboard.string(mastercam.filenameNoExt);
wait();
keyboard.tab().type();
wait();
keyboard.ctrl("a").type();
wait();
keyboard.string(mastercam.currentPath.replace(/\//g, "\\"));

toast("Updated Title, Path, and Post", mastercam.filename);