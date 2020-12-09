class Popup {
  constructor() {
    this._mousePoint = sp.GetCurrentMousePoint();
    this._menu = new PopupMenuInfoEx(this._mousePoint);
  }
  
  getInstance() {
    return this._menu;
  }
  
  entry(text, script = "") {
    return new PopupMenuItem(text, script = "");
  }
    
  addEntry(item) {
    this._menu.MenuItems.Add(item);
  }
   
  subMenu() {
    //
  }
}

function popup(action, menuItems) {
  const menu = new PopupMenuInfo();
  let id = 1;

  menu.Location = action.End;
  menu.Callback = `$.popupSelection`;
  menuItems.forEach((item) => {
    menu.Items.Add(item[0]);
    
    if (item[0] !== "-") {
      sp.StoreString(`__POPUP_ITEM_${id++}`, item[0]);
    }
  });
  
  menu.Items.Add("-");
  menu.Items.Add("Cancel");
  return sp.ShowPopupMenu(menu);
}

popup.handler = (menuEntries) => {
  return ({ id, label }) => {
    menuEntries.forEach(entry => {
      if (entry[0] === label) {
        entry[1](id, label);
      }
    });
  };
};

popup.create = () => new PopupMenuInfoEx(sp.GetCurrentMousePoint());

popup.menuItem = (...args) => new PopupMenuItem(...args);

popup.addToMenu = (menu) => (item) => menu.MenuItems.Add(item);

popup.addToSubMenu = (menu) => (item) => menu.SubMenuItems.Add(item);

popup.show = (popup) => sp.ShowPopupMenuEx(popup);

popup.spacer = new PopupMenuItem("-");

popup.cancel = new PopupMenuItem("Cancel");

popup.subMenu = (text, items) => {
  const menu = popup.menuItem(text);
  const add = popup.addToSubMenu(menu);
  
  items.forEach(item => add(popup.menuItem(item)));
  
  return menu;
};

popup.Popup = Popup;

module.exports = popup;