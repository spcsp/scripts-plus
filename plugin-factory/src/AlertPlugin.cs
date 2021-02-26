using Microsoft.ClearScript.V8;

namespace AlertPlugin
{
  public static class AlertPlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute("const alert = (msg, title = '') => sp.MessageBox(msg, title)");
    }
  }
}
