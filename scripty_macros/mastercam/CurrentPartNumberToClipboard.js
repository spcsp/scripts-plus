var { apps, toast } = ScriptyStrokes();

var { partNumber } = apps.mastercam;

clip.SetText(partNumber);

toast(partNumber, "Copied To Clipboard");
