var modal = $.dialog.create("Text Input Demo");

modal.show(input => $.alert(input, "Input"));
