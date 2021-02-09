(function(outfile) {
  const quote = str => `"${str}"`;
  
  const spms = sp.GetMethods();

  let s = "{\n";
  
  for (var m = 0; m < spms.Count(); m++) {
    const methodName = spms[m].Name;
    const returnType = spms[m].ReturnType.Name;

    s += "\t" + quote(methodName) + `: {\n`;
    s += `\t\t"parameters": [\n`;

    let comma = "";

    const parameters = spms[m].GetParameters();
    for (var i = 0; i < parameters.Count(); i++) {
      const param = parameters[i];
      const paramName = param.Name;
      const paramType = param.ParameterType.ToString().replace(/&$/, "");

      s += comma + "\t\t\t{" +quote(paramName) + `: "` + paramType + `"}`;

      comma = ",\n";
    }

    s += "\n\t\t],\n\t\t";
    s += `"returnType": "` + returnType + `"\n`;
    
    s += "\t},"; // Close method def
  }

  s = s.replace(/,$/, "") + "\n}"; // Close json

  File.WriteAllText(outfile, s);
  sp.ShowBalloonTip("ScriptsPlus", `Wrote to ${outfile}`, 'Info', 5000);
})