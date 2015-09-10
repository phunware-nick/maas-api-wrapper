var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

maas.changePassword(177, 'demotime2', 'demotime', function(err) {
  if(err) return console.log(err);
});
