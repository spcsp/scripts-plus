var { mastercam } = $.apps;
var paths = $.core.mem("POSTS");
var wait = (x = 50) => sp.Sleep(x);

$.toast(`Updating ${mastercam.filename}`, "Setting Title, Post and Project Paths", );

wait(500);
$.keyboard.selectAll();
wait();
$.keyboard.string(mastercam.filenameNoExt);
wait();
$.keyboard.tab(5);
$.keyboard._().type();
wait(1000);
$.keyboard.selectAll();
wait();
$.keyboard.string(paths[$.env.HOSTNAME]);
wait();
$.keyboard.enter();
wait(1000);
sp.SendShiftDown();
$.keyboard.tab(4);
sp.SendShiftUp();
wait();
$.keyboard.selectAll();
wait();
$.keyboard.string(mastercam.currentPath.replace(/\//g, "\\"));

$.toast(`${mastercam.filename} is up to date`, "Update Complete");