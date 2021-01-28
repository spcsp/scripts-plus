using Microsoft.ClearScript.V8;

namespace HyperscriptPlugin
{
  public static class HyperscriptPlugin 
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute(Properties.Resources.HYPERSCRIPT_SOURCE);
    }
    
    public static string GetSource()
    {
      return Properties.Resources.HYPERSCRIPT_SOURCE;
    }
  }
}