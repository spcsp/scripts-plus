function getAppWindows(app) {
  return sp.WindowsFromTitlePartial(app.TITLE_PARTIAL);
}

function getAppWindowTitle(app) {
  return getAppWindows(app)[0].Title;
}

function getActive() {
  return sp.ForegroundWindow();
}

function titleMatcher(title, { Match, NoMatch }) {
  const match = Match || function () {};
  const nomatch = NoMatch || function () {};
  return getActive().Title === title ? match() : nomatch();
}

const center = (action) => action.Window.Center();

module.exports = {
  center,
  getActive,
  titleMatcher,
  getAppWindows,
  getAppWindowTitle,
};
