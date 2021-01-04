var res = $.unpkg("awilix/lib/awilix.umd.js");

eval(res);

var container = Awilix.createContainer();

container.register('mmmm, pie', Awilix.asValue(Math.PI));

$.alert(container.resolve('mmmm, pie'));
