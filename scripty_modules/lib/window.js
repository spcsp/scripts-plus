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

function titleMatcher(title, { Match, NoMatch }) {
  const match = Match || function(){};
  const nomatch = NoMatch || function(){};
  return sp.ForegroundWindow().Title === title ? match() : nomatch();
}

module.exports = {
  foreground,
  titleMatcher,
  getAppWindows,
  getAppWindowTitle
}
