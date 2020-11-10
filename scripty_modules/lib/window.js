function getAppWindows(app) {
  return sp.WindowsFromTitlePartial(app.TITLE_PARTIAL);
}

function getAppWindowTitle(app) {
  return getAppWindows(app)[0].Title;
}

const foreground = {
  get title() {
    return sp.ForegroundWindow().Title;
  }
};

module.exports = {
  foreground,
  getAppWindows,
  getAppWindowTitle
}
