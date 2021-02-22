using Microsoft.ClearScript.V8;

namespace EvalFilePlugin
{
  public static class EvalFilePlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute("const evalFile = abspath => eval(clr.System.IO.File.ReadAllText(abspath))");
    }
  }
}

