var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

var data = {
  email: 'nloveridge@phunware.com',
  first_name: 'Nick',
  last_name: 'Loveridge',
  org_id: 1,
  is_active: 1,
};

maas.createUser(data, function(err, res) {
  console.log(err, res);
});