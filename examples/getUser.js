var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

// var str = maas._encrypt('thisisateststring');
// console.log(str);

maas.getUser(181, function(err, data) {
  // if(err) return console.log(err);
  console.log(err, data);

  // console.log(res.statusCode, res.body);
});
