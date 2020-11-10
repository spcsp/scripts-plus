var { apps, toast } = ScriptyStrokes();

var { filenameNoExt } = apps.mastercam;

clip.SetText(filenameNoExt);

toast(filenameNoExt, "Copied To Clipboard");
