var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

// maas.resetPassword('nick@fusemedia.ca', null, function(err, data) {
//   console.log(err, data);
// });

maas.resetPasswordKey('demotime', '76542f35014e2c2c24e1ba83e76bb3172ee0a7fc', function(err, data) {
  console.log(err, data);
});
