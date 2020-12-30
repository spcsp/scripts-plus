var { cimco } = $.apps;

var opNum = cimco.abspath.match(/_OP([1-9])/); 

if (typeof opNum[1] !== "undefined") {
  var currOp = parseInt(opNum[1]);
  var nextOp = currOp + 1;
  var nextOpAbspath = cimco.abspath.replace(`OP${currOp}`, `OP${nextOp}`);
  
  $.toast(nextOpAbspath, `Opening OP${nextOp}`); 
  
  sp.Sleep(500);
  sp.SendKeys("^o");
  sp.Sleep(200);
  sp.SendString(nextOpAbspath);
  sp.Sleep(200);
  sp.SendKeys("{ENTER}");
} else {
  $.toast("Could not parse an operation number", "Error");  
}
