function popup(callback, menuItems = []) {
    var menu = new PopupMenuInfo();

    menu.Callback = `$.popupCallback['${callback}']`;
    
    menuItems.forEach(menuItem => {
      menu.Items.Add(Array.isArray(menuItem) ? menuItem[1] : "-");
    });


    return (action) => {
      menu.Location = action.End;
      
      return sp.ShowPopupMenu(menu);
    }
}

module.exports = popup;