var { alert } = ScriptyStrokes();

function PopupMenu(menuItems, { End }, callback) {
  var menu = new PopupMenuInfo();

  menuItems.forEach(menuItem => {
    menu.Items.Add(Array.isArray(menuItem) ? menuItem[1] : "-");
  });

  menu.Location = End;
  menu.Callback = callback;

  return menu;
}

var popupMenu = PopupMenu([
  [1, "Test 1", () => alert("Test 1")],
  [2, "Test 2", () => alert("Test 2")],
  null,
  [3, "Test 3", () => alert("Test 3")],
], action, "PopupMenuCallback");

var res = sp.ShowPopupMenu(popupMenu);
