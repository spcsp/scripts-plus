var { alert, apps, fp } = ScriptyStrokes();

var { calc } = apps;

var activeWindowIsCalc = fp.createForegroundWindowTitleMatcher("Calculator");

activeWindowIsCalc({
  True: () => alert(`yes`),
  False: () => alert(`no`),
});

calc.open();

sp.Sleep(500);

activeWindowIsCalc({
  True: () => alert(`yes`),
  False: () => alert(`no`),
});