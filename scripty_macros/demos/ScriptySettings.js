$.toast(JSON.stringify($.core.getSettings()), "Default Instance");

// Invoking $ will return a new instance customized
var $$ = $({
  toast: { // Changing this will affect toast() everywhere
    textColor: "white",
    backgroundColor: "maroon"
  }
});

$$.toast(JSON.stringify($$.core.getSettings()), "Custom Instance");