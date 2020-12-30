sp.SendKeys("^a");
sp.SendKeys("^c");
sp.SendControlUp();
var str = clip.GetText();
var decrementedStr = str.replace(/(\d+)+/g, (match, number) => parseInt(number)-1);
clip.SetText(decrementedStr);
sp.SendKeys("^v");
