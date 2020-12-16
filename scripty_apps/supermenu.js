class SuperMenu {  
  constructor({ apps, popup }) {
    this.mcam = apps.mastercam;
    this.$popup = popup;
    this._menu = this.$popup.create();
  }
  
  _addToMainMenu(li) {
    var addToMainMenu = this.$popup.addToMenu(this._menu);
    
    addToMainMenu(li);
    
    return this;
  }
  
  get Spacer() {
    return $.popup.spacer
  }
  
  get Cancel() {
    return $.popup.cancel;
  }
    
  get PartOps() {
    return this.$popup.menuItem(`${partBase} Ops`);
  }
  
  get Mastercam() {
    return {
      FileName: {
        NoExt
      }
    }
  }
  
  Create(menuItems) {
    var { addToMenu, addToSubMenu, menuItem, show } = this.$popup;
    
    menuItems.forEach(m => this._addToMainMenu(m));
    
    var ncfile = this.mcam.filenameNoExt;
    var partBase = this.mcam.partNumber.split("_")[0];
    var addToOps = this.$popup.addToSubMenu(this.PartOps);

    /**
     * Operations Sub-menu
     */
    getAllMcamFiles().forEach(f => addToOps(menuItem(f)));
    addToOps($.popup.spacer);
    addToOps(menuItem("Open Job Folder", `$.macro("mastercam/OpenCurrentJobFolder")`));

    /**
     * Main Menu
     */
    addToMainMenu(menuItem(`Open ${ncfile}.NC`, `$.macro("mastercam/OpenMatchingNCFile")`));
    addToMainMenu($.popup.spacer);
    addToMainMenu(menuItem("Copy Job Path", `$.macro("mastercam/CurrentFolderPathToClipboard")`));
    addToMainMenu(menuItem("Copy Part Number", `$.macro("mastercam/CurrentPartNumberToClipboard")`));
    addToMainMenu(menuItem("Copy Filename", `$.macro("mastercam/CurrentFilenameToClipboard")`));
    addToMainMenu(partOps);

    show(popup);
  }
  
  get Spacer() {
    addToMainMenu(this.$popup.spacer);
    
    return this;
  }
  
  get mcamFilesInPath() {
    var path = this.mastercam.currentPath;
    var files = [...$.fs.readdir(path)];

    return files.filter(abspath => {
      const ext = abspath.split(".").pop().toUpperCase();

      if (ext.startsWith("M")) {
        return abspath;
      }
    });
  }
  
  
}

module.exports = function superMenuFactory() {
  return new SuperMenu(stdlib);
}



