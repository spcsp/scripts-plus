using Microsoft.ClearScript.V8;
using System.Windows.Forms;

namespace ScriptsPlusPlugin
{
  public static class ScriptsPlusPlugin
  {
    public static string BundleSrc { get; } = Properties.Resources.ScriptsPlus_js;

    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      try
      {
        e.Execute(BundleSrc);
      }
      catch (System.Exception err)
      {
        MessageBox.Show(err.Message, "ScriptsPlus Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
      }
    }
  }
}

