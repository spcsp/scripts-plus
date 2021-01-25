using Microsoft.ClearScript.V8;

namespace ScriptsPlusCorePlugin
{
  public static class ScriptsPlusCorePlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute(@"function ScriptsPlus(PATH_TO_REPO) {
        const abspath = `${PATH_TO_REPO}/bootstrap.js`;
        const contents =  clr.System.IO.File.ReadAllText(abspath);
        const bootstrap = eval(`(${contents})`);

        return bootstrap({ root: PATH_TO_REPO });
      }");
    }
  }
}

