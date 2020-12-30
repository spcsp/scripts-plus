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
    opt.title || "ScriptyStrokes",
    message,
    opts.type || "Info",
    opts.timeout || 3000
  );
}

balloon.factory = title => message => balloon(message, { title });

module.exports = balloon;
