using Microsoft.ClearScript.V8;

namespace EvalFilePlugin
{
  public static class EvalFilePlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      string[] lines = {
        "function GithubGist(user, hash, evalResult = true) {",
        "const now = new Date();",
        "const uri = `https://gist.githubusercontent.com/${user}/${hash}/raw?v=${now}`;",
        "const client = new HttpClient();",
        "const response  = await  client.GetStringAsync(uri);",
        "const source = response.Result;",
        "return evalResult ? eval(source) : `${source}`;",
        "}"
      };

      e.Execute(string.Join("", lines));
    }
  }
}
