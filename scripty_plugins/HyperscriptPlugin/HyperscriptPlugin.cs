using Microsoft.ClearScript.V8;

namespace HyperscriptPlugin
{
  public static class HyperscriptPlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute("function hyper(){sp.MessageBox('hyper!','');}");
      //e.Execute(Properties.Resources.HYPERSCRIPT_SOURCE);
    }
  }
}