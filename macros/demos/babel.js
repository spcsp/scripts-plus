var output = $.babel.transform('const message = null ?? "Hello World!";');

eval(output);

$.alert(message);

