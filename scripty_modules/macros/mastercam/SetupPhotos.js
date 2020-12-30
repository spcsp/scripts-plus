var { explorer, mastercam } = $.apps;

var setupFolder = mastercam.currentDir + "/SETUP_INFO";

var baseFilename = `${setupFolder}/${mastercam.partNumber}`;

function getFilename() {
    var i = 0;
    var screenshot = `${baseFilename}.png`;

    while (clr.System.IO.File.Exists(screenshot)) {
        i++;
        screenshot = `${baseFilename} (${i}).png`;
    }

    return screenshot;
}

//clip.Clear();

sp.SendKeys("*ho");
sp.SendKeys("{ESC}");
sp.Sleep(200);

if (clip.ContainsImage()) {
    $.fs.mkdir(setupFolder);

    var screenshot = getFilename();

    clip.GetImage().Save(screenshot);

    $.toast(screenshot, "Screenshot Saved");

    explorer.open(setupFolder);
} else {
    $.toast("There was an error taking the screenshot");
}