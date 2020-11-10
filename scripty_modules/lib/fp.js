function createForegroundWindowTitleMatcher(titleToMatch) {
  return ({ True, False }) => {
    const title = sp.ForegroundWindow().Title;
    const matchCb = True || (() => {});
    const noMatchCb = False || (() => {});
    
    return title === titleToMatch ? matchCb() : noMatchCb();
  };
}

module.exports = {
  createForegroundWindowTitleMatcher
};