using StrokesPlus.net.Code;
using StrokesPlus.net.Engine;

namespace ScriptyStrokes
{
  public static class ScriptyStrokes
  {
    static ScriptyStrokes()
    {
      foreach (var spe in ActionFunctions.EngineList().Where(e => !e.IsExecuting))
      {
        // Only exec if another plug-in constructor hasn't already done it for the engine in the loop
        if (!ActionFunctions.GetStoredBool($"ScriptyStrokes_Init_{spe.Engine.Name}"))
        {
          // Execute your script here, like the Load tab, in script call scriptTest('test');
          spe.Engine.Execute("function scriptTest(msg) {sp.MessageBox(msg + ' " + spe.Engine.Name + "', 'Engine'); }");
          // Store that the current engine has been initialized
          ActionFunctions.StoreBool($"ScriptyStrokes_Init_{spe.Engine.Name}", true);
        }
      }
    }

    public static int ReturnNumber(int num)
    {
      // from script: MyPlugin.ReturnNumber(2);
      return num;
    }

    public static void DoSomethingWithoutReturnValue()
    {
      // from script: MyPlugin.DoSomethingWithoutReturnValue();
      // Do stuff
    }
  }
}