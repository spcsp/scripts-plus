using Microsoft.ClearScript.V8;
using ScriptyStrokes.Core;

namespace ScriptyStrokes
{
  public static class SandboxPlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute(EmbeddedResource.GetFileContents("getEngineName.js"));
    }

    public static int ReturnNumber(int num)
    {
      // from script: ScriptyPlugin.ReturnNumber(2);
      return num;
    }

    public static void DoSomethingWithoutReturnValue()
    {
      // from script: ScriptyPlugin.DoSomethingWithoutReturnValue();
      // Do stuff
    }
  }
}