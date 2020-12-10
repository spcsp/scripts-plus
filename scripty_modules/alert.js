/**
 * Create a modal dialog box notification.
 *
 * @param message string
 * @param title   string
 */
function alert(message, title = "ScriptyStrokes") {
  sp.MessageBox(message, title);
}

module.exports = alert;