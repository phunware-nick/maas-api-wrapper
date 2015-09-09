var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

// Object of available props
// https://developer.phunware.com/display/DD/Update+a+User
var props = {
  // name: '',
  // tapit_api_token: '',
  tapit_signature_token: 'test_token',
  // services: [],
};

maas.updateOrg(62, props, function(err, orgData) {
  if(err) return console.log(err);

  console.log(orgData);
});