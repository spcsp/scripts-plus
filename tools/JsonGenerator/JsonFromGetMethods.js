(function (outfile) {
  const quote = str => `"${str}"`;
  const keyVal = (key, val) => `"${key}":"${val}"`;
  const trim = str => str.replace(/,$/, "");
  
  const spms = sp.GetMethods();

  let s = `{\n"methods": [\n`;

  for (var m = 0; m < spms.Count(); m++) {
    const methodName = spms[m].Name;
    const returnType = spms[m].ReturnType.Name;

    s += `\t{\n\t` +keyVal("name", methodName)+`\n`;
    s += `\t ,"parameters": [\n`;

    let comma = "";
    let pTemp = ""

    const parameters = spms[m].GetParameters();
    for (var i = 0; i < parameters.Count(); i++) {
      const param = parameters[i];
      const paramName = param.Name;
      const paramType = param.ParameterType.ToString().replace(/&$/, "");

      pTemp += comma + `\t\t\t{` + keyVal(paramName, paramType) + `}`;

      comma = `,\n`;
    }

    s += pTemp+`\n\t\t],\n\t\t`;
    s += trim(keyVal("returnType", returnType))+`\n`;

    s += `\t},`; // Close method def
  }

  s = trim(s) + `]`; // Close "methods"
  
  s += `}`; // Close json

  File.WriteAllText(outfile, s);
  sp.ShowBalloonTip("ScriptsPlus", `Wrote to ${outfile}`, "Info", 5000);
});
