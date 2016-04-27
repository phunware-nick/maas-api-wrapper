var MaaS = require('./../index.js');
var keys = require('./keys.js');

keys._endpoint = 'https://core-api-dev.phunware.com/v1.0';

var maas = new MaaS(keys);

// var str = maas._encrypt('thisisateststring');
// console.log(str);

maas.getUser(178, function(err, data) {
  // if(err) return console.log(err);
  console.log(err, data);

  // console.log(res.statusCode, res.body);
});
