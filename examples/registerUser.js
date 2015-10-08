var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

var data = {
  email: 'demo3@example.com',
  password: 'demotime',
  // FIXME: Registering a user via Org name is bad - use org id.
  orgName: 'Test Org for SSP',
  // FIXME: email_url will not validate.
  email_url: 'maas.phunware.com/verify-email/{key}',
};

maas.regUser(data, function(err, userData) {
  if(err) {
    console.log('ERROR:', err.error.messages);
    return;
  }
  console.log(userData);
});
