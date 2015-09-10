var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

// Object of available props
// https://developer.phunware.com/display/DD/Update+a+User
var props = {
  is_active: 1,
  // first_name: 'Nick',
  // last_name: 'Loveridge'
  // org_id: 62
};

maas.updateUser(176, props, function(err, userData) {
  if(err) return console.log(err);

  console.log(userData);
});