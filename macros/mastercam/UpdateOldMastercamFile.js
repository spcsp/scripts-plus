var paths = $.store.get("POSTS");
var wait = (x = 50) => sp.Sleep(x);

$.toast(`Updating ${$.mastercam.filename}`, {
  title: "Setting Title, Post and Project Paths"
});

wait(500);
$.keyboard.selectAll();
wait();
$.keyboard.string($.mastercam.filenameNoExt);
wait();
$.keyboard.tab(5);
$.keyboard.type("{SPACE}");
wait(1000);
$.keyboard.selectAll();
wait();
$.keyboard.type(paths[$.env.HOSTNAME]);
wait(1000);
sp.SendShiftDown();
$.keyboard.tab(4);
sp.SendShiftUp();
wait();
$.keyboard.selectAll();
wait();
$.keyboard.string($.mastercam.currentPath.replace(/\//g, "\\"));

$.toast(`${$.mastercam.filename} is up to date`, { title: "Update Complete" });