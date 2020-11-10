var { toast, core } = ScriptyStrokes({
  toast: { // Changing this will affect toast() everywhere
    textColor: "white",
    backgroundColor: "maroon"
  }
});

toast(JSON.stringify(core.getSettings()), "Dynamic Settings");