sp.SendKeys("^a");
sp.SendKeys("^c");
sp.SendControlUp();
var str = clip.GetText();
var incrementedStr = str.replace(/(\d+)+/g, (match, number) => parseInt(number)+1);
clip.SetText(incrementedStr);
sp.SendKeys("^v");
