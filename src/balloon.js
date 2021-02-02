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
function balloon(message, opts = {}) {
  return sp.ShowBalloonTip(
    opts.title || "ScriptsPlus",
    message,
    opts.type || "Info",
    opts.timeout || 3000
  );
}

module.exports = balloon;
