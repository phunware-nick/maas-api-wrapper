var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

// var str = maas._encrypt('thisisateststring');
// console.log(str);

maas.auth('nloveridge@phunware.com', 'demotime', function(err, res) {
  if(err) return console.log(err);

  console.log(res.statusCode, res.body);
});