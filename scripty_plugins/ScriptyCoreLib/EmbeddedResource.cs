using System.IO;
using System.Reflection;

namespace ScriptyStrokes
{
  namespace Core
  {
    public static class EmbeddedResource
    {
      public static string GetFileContents(string resourceName)
      {
        Assembly asm = Assembly.GetExecutingAssembly();
        
        string guid = asm.GetName().Name + ".Properties." + resourceName;

        using (Stream resStream = asm.GetManifestResourceStream(guid))
        {
          using (StreamReader sr = new StreamReader(resStream))
          {
            return sr.ReadToEnd();
          }
        }
      }
    }
  }
}