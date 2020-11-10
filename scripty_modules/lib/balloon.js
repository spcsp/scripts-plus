/**
 * Create a balloon message from the tray
 *
 * Wrapper for `sp.ShowBalloonTip()`
 *
 * @param message string
 * @param title   string
 * @param type    "Warning" | "Error" | "Info" | "None"
 * @param timeout number
 */
function balloon(message, config) {
  const options = Object.assign(
    {
      title: "ScriptyStrokes",
      type: "Info",
      timeout: 3000
    },
    config
  );

  sp.ShowBalloonTip(options.title, message, options.type, options.timeout);
}

balloon.factory = title => {
  return (message, type = "Info", timeout = 3000) => {
    balloon(message, { title, type, timeout });
  };
};

module.exports = balloon;
