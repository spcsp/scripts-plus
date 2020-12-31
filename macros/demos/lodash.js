var src = $.unpkg("lodash");

eval(src);

var data = [0,1,2,3,4,5,6,7,8,9];

$.alert(_.sample(data));
