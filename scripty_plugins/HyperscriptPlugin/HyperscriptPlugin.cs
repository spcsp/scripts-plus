using Microsoft.ClearScript.V8;
using ScriptyStrokes.Core;

namespace ScriptyStrokes
{
  public static class HyperscriptPlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute("function hyper(){sp.MessageBox('hyper!','');}");
      //e.Execute(EmbeddedResource.GetFileContents("h.js"));
    }
  }
}