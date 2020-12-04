var { apps, alert, date, exec, fs, path, regedit, toast } = ScriptyStrokes();

var { cimco, explorer, mastercam } = apps;

var noteFileName = `${mastercam.filenameNoExt}.TXT`;

var setupFolder = explorer.mapUNCpath(`${mastercam.currentPath}SETUP_INFO`);

fs.mkdir(setupFolder);

var notesUncPath = `${setupFolder}/${noteFileName}`;

toast(notesUncPath, `Opening notes for ${mastercam.filenameNoExt}`);

if (!fs.exists(notesUncPath)) {
    var contents = `Program: ${mastercam.filename}
Path: ${mastercam.currentPath} 


> ${date.datestamp()}
Program ran fine, no issues.
-`;

    fs.writeFile(notesUncPath, contents);
}

var wordpad = apps.factory.create("wordpad");

wordpad.open(notesUncPath);