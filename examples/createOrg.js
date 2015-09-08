var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

maas.createOrg('Test Org for SSP', null, function(err, org) {
  if(err) return console.log(err);
  console.log(org);
});