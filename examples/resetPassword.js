var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

maas.resetPassword('nick@fusemedia.ca', null, function(err, data) {
  console.log(err, data);
});
