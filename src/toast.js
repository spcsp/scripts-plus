/**
 * Create a OSD style popover notification
 *
 * @param message string
 * @param title   string
 */
function toast(message, opts = {}) {
  const info = new DisplayTextInfo();
  info.UsePrimaryScreen = true;

  info.Message = message;
  if (typeof opts === "string") {
    info.Title = opts;
  } else {
    info.Title = typeof opts.title === "string" ? opts.title : "ScriptyStrokes";
  }

  info.ForeColor = opts.textColor || "cyan";
  info.TitleFont = new Font("Segoe UI", 18, host.flags(FontStyle.Bold));
  info.TitleAlignment = opts.titleAlignment || "Center";
  info.MessageFont = new Font("Segoe UI Semibold", 16);
  info.MessageAlignment = opts.messageAlignment || "Center";

  info.Padding = opts.padding || 20;
  info.Duration = opts.duration || 3000;
  info.Location = opts.location || "top";
  info.Opacity = opts.opacity || 0.7;
  info.BackColor = opts.backgroundColor || "black";

  return sp.DisplayText(info);
}

module.exports = toast;
