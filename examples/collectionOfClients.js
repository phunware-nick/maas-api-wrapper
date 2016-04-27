var MaaS = require('./../index.js');
var keys = require('./keys.js');

keys._endpoint = 'https://core-api-dev.phunware.com/v1.0';

var maas = new MaaS(keys);

maas.getClients(null, 'Phunware', null, function(err, orgData) {
  if(err) return console.log('ERROR:', err);

  console.log(orgData);
});


