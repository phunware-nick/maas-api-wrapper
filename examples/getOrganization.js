var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

maas.getOrg(62, function(err, org) {
  if(err) return console.log(err);
  console.log(org);
});
