var MaaS = require('./../index.js');
var keys = require('./keys.js');

var maas = new MaaS(keys);

// var str = maas._encrypt('thisisateststring');
// console.log(str);

// NOTE: 3rd parameter - provider - is optional.
maas.authUser('demo2@example.com', 'demotime', 'phunware', function(err, userData) {
  if(err) return console.log(err);

  console.log(userData);

  if(userData.hasOwnProperty('orgs') && userData.orgs.length > 0) {
    for(var i = 0; i < userData.orgs.length; i++) {
      console.log(userData.orgs[i].id, userData.orgs[i].name);
    }
  }
});
