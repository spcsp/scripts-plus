function (outfile) {
  File.WriteAllText(outfile, sp.GetHelpJson());

  sp.ShowBalloonTip("ScriptsPlus", `Wrote to ${outfile}`, "Info", 5000);
}