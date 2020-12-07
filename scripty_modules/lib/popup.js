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

module.exports = popup;