var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

var data = {
  email: 'vkumar1@phunware.com',
  first_name: 'Vinod',
  last_name: 'Kumar',
  password: 'Austin15',
  org_id: 62,
  is_active: 1,
};

maas.createUser(data, function(err, res) {
  console.log(err, res);
});
