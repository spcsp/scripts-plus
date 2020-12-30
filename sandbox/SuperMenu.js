class SuperMenu {  
  constructor({ mastercam, popup }) {
    this._mcam = mastercam;
    this._popup = popup;
    
    this._menu = this._popup.create();
  }
  
  _addToMainMenu(li) {
    var addToMainMenu = this._popup.addToMenu(this._menu);
    
    addToMainMenu(li);
    
    return this;
  }
  
  get Spacer() {
    return this._popup.spacer
  }
  
  get Cancel() {
    return this._popup.cancel;
  }
    
  get PartOps() {
    return this._popup.menuItem(`${partBase} Ops`);
  }
  
  get Mastercam() {
    return {
      FileName: {
        NoExt
      }
    }
  }
  
  Create(menuItems) {
    var { addToMenu, addToSubMenu, menuItem, show } = this._popup;
    
    menuItems.forEach(m => this._addToMainMenu(m));
    
    var ncfile = this._mcam.filenameNoExt;
    var partBase = this._mcam.partNumber.split("_")[0];
    var addToOps = this._popup.addToSubMenu(this.PartOps);

    /**
     * Operations Sub-menu
     */
    getAllMcamFiles().forEach(f => addToOps(menuItem(f)));
    addToOps(this._popup.spacer);
    addToOps(menuItem("Open Job Folder", `$.macro("mastercam/OpenCurrentJobFolder")`));

    /**
     * Main Menu
     */
    addToMainMenu(menuItem(`Open ${ncfile}.NC`, `$.macro("mastercam/OpenMatchingNCFile")`));
    addToMainMenu(this._popup.spacer);
    addToMainMenu(menuItem("Copy Job Path", `$.macro("mastercam/CurrentFolderPathToClipboard")`));
    addToMainMenu(menuItem("Copy Part Number", `$.macro("mastercam/CurrentPartNumberToClipboard")`));
    addToMainMenu(menuItem("Copy Filename", `$.macro("mastercam/CurrentFilenameToClipboard")`));
    addToMainMenu(partOps);

    show(popup);
  }
  
  get Spacer() {
    addToMainMenu(this._popup.spacer);
    
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

module.exports = SuperMenu;
