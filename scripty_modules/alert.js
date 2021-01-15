/**
 * Create a modal dialog box notification.
 *
 * @param message string
 * @param title   string
 */
function alert(msg, title = "ScriptyStrokes") {
  let keys = [];
  
  if (typeof msg === "object") {
    keys = Object.keys(msg);
    msg = keys.map(k => `key: ${k}, val: ${msg[k]}`).join("\n");
  }
  
  if (Array.isArray(msg)) {
    msg = msg.join(",");
  }
    
  sp.MessageBox(msg, title);
}

module.exports = alert;