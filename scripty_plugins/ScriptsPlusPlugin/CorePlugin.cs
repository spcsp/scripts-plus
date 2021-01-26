using Microsoft.ClearScript.V8;

namespace ScriptsPlusPlugin
{
  public static class ScriptsPlusPlugin
  {
    public static string BOOTSTRAP_INIT_SRC = @"
      function ScriptsPlus(PATH_TO_REPO) {
        const abspath = `${PATH_TO_REPO}/bootstrap.js`;
        const contents =  clr.System.IO.File.ReadAllText(abspath);
        const bootstrap = eval(`(${contents})`);

        return bootstrap({ root: PATH_TO_REPO });
      }";
      
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      e.Execute(BOOTSTRAP_INIT_SRC);
    }
  }
}

