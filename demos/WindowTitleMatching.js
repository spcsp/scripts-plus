var activeWindowIsCalc = $.fp.createForegroundWindowTitleMatcher("Calculator");

var handlers = {
  True: () => alert(`yes`),
  False: () => alert(`no`),
};

// This will check after calc opens
$.timers.setTimeout(`
  activeWindowIsCalc(handlers);
`, 2000);

// Check before calc opens
activeWindowIsCalc(handlers);

// Open calc
$.apps.calc.open();