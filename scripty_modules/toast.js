/**
 * Create a OSD style popover notification
 *
 * @param message string
 * @param title   string
 */
function toast(message, title = "ScriptyStrokes") {
  const settings = sp.GetStoredObject("SCRIPTY_SETTINGS").toast;
  const info = new DisplayTextInfo();
  
  info.Message = message;
  info.Title = title;
  info.TitleAlignment = "Center";
  info.MessageAlignment = "Center";
  info.Duration = 3000;
  //info.Opacity = 0.7;
  info.Location = "top";
  info.TitleFont = new Font("Segoe UI", 18, host.flags(FontStyle.Bold));
  info.MessageFont = new Font("Segoe UI Semibold", 16);
  info.BackColor = settings.backgroundColor,
  info.ForeColor = settings.textColor,
  info.Padding = 20;
  info.UsePrimaryScreen = true;

  return sp.DisplayText(info);
}

toast.factory = title => message => toast(message, title);

module.exports = toast;
