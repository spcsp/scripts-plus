function popup(action, menuItems = []) {
  const menu = new PopupMenuInfo();

  menu.Callback = `$.popupSelection`;
  menuItems.forEach(t => menu.Items.Add(t));
  menu.Location = action.End;
  
  sp.ShowPopupMenu(menu);
}

module.exports = popup;