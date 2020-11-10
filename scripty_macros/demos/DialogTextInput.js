var { alert, dialog } = ScriptyStrokes();

var modal = dialog.create("Text Input Demo");

modal.show(input => alert(input, "Input"));
