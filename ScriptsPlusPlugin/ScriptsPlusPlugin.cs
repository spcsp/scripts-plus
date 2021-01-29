using Microsoft.ClearScript.V8;

namespace ScriptsPlusPlugin
{
  public static class ScriptsPlusPlugin
  {
    public static string BundleSrc { get; } = 
      Properties.Resources.ResourceManager.GetString("ScriptsPlus.js");

    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute(BundleSrc);
    }
  }
}

