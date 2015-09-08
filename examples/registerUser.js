var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

var data = {
  email: 'nloveridge@phunware.com',
  password: 'demotime',
  org: 'Phunware',
  email_url: 'http://www.fusemedia.ca/verify/{key}',
};

maas.regUser(data, function(err, userData) {
  if(err) {
    console.log(err);
    return;
  }
  console.log(userData);
});