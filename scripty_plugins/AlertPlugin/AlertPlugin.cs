using Microsoft.ClearScript.V8;
using ScriptyStrokes.Core;

namespace AlertPlugin
{
  public static class AlertPlugin
  {
    public static void StrokesPlusInitStaticPlugin(V8ScriptEngine e)
    {
      string script = @"function alert(msg, title='ScriptyStrokes') {
        let keys = [];

        if (typeof msg === 'object')
        {
          keys = Object.keys(msg);
          msg = keys.map(k => `key: ${ k}, val: ${ msg[k]}`).join('\n');
        }

        if (Array.isArray(msg))
        {
          msg = msg.join(',');
        }

        sp.MessageBox(msg, title);
      }";

      e.Execute(script);
    }
  }
}