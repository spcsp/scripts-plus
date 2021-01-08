$.mouse.defaults.pauseTime = 250;
$.mouse.hooks.move.after = () => sp.Sleep(100);

function editSelectedOperations() {
    return $.mouse
        .move(265, 375) // Center of first Machine Group
        .rightClick()
        .move(265, 375) // Over flyout triangle for [Edit selected operations...]
        .waitForSubmenu()
}

function editCommonParams() {
    editSelectedOperations()
        .click(290, 375); // Gutter area for [Edit common parameters...]
}

function editNcFileName() {
    editSelectedOperations()
        .click(290, 400); // Gutter area for [Change NC file name...]
}

function editProgramNumber() {
    editSelectedOperations()
        .click(290, 425); // Gutter area for [Change program number...]
}

editCommonParams();