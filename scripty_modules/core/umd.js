(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MyLibrary = factory();
  }
}(this, function() { // Define and return a single function or object.
  var MyLibrary = function() {
    // This is where the magic happens.
  }
  return MyLibrary;
}));