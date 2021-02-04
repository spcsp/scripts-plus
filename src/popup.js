function popup(menuItems) {
  const menu = new PopupMenuInfoEx(sp.GetCurrentMousePoint());

  menuItems.forEach((m) => menu.MenuItems.Add(m));

  return sp.ShowPopupMenuEx(menu);
}

popup.spacer = () => new PopupMenuItem("-");

popup.cancel = () => new PopupMenuItem("Cancel");

popup.menuItem = (...args) => new PopupMenuItem(...args);

popup.addToMenu = (menu) => (item) => menu.MenuItems.Add(item);

popup.addToSubMenu = (menu) => (item) => menu.SubMenuItems.Add(item);

//popup.show = (popup) => sp.ShowPopupMenuEx(popup);

popup.subMenu = (text, items) => {
  const menu = popup.menuItem(text);
  const add = popup.addToSubMenu(menu);

  items.forEach((item) => add(popup.menuItem(item)));

  return menu;
};

module.exports = popup;
