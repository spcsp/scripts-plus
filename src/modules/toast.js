/**
 * Create a OSD style popover notification
 *
 * @param message string
 * @param title   string
 */
function toast(message, opts = {}) {
  const info = new DisplayTextInfo();
  
  info.Message = message;
  info.Title = opts.title || "ScriptyStrokes";
  info.TitleAlignment = opts.titleAlignment || "Center";
  info.MessageAlignment = opts.messageAlignment || "Center";
  info.Duration = opts.duration || 3000;
  info.Opacity = opts.opacity || 0.7;
  info.Location = opts.location || "top";
  info.TitleFont = new Font("Segoe UI", 18, host.flags(FontStyle.Bold));
  info.MessageFont = new Font("Segoe UI Semibold", 16);
  info.BackColor = opts.backgroundColor || "black",
  info.ForeColor = opts.textColor || "cyan",
  info.Padding = opts.padding || 20;
  info.UsePrimaryScreen = true;

  return sp.DisplayText(info);
}

toast.factory = title => message => toast(message, { title });

module.exports = toast;
