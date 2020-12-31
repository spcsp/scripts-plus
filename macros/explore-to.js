$.explorer.open($.env.SCRIPTY_ROOT);

/*
var start = new clr.System.Diagnostics.ProcessStartInfo();
start.FileName = sp.ExpandEnvironmentVariables("%windir%") + "\\explorer.exe";
start.UseShellExecute = false;
start.CreateNoWindow = false;
start.RedirectStandardOutput = true;
start.RedirectStandardError = true;

var p = clr.System.Diagnostics.Process.Start(start);
  
p.WaitForInputIdle();
  */
$.keyboard.alt("d");