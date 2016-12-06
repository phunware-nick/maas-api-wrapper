/**
 * MaaS API Module
 */

var crypto  = require('crypto');
var request = require('request');
var _       = require('lodash');
var noop    = function(){};

/**
 * API Facade for MaaS
 * @param {object} options  props of accessKey, signature, encyptKey - all strings.
 * @returns {object} instance
 */
var MaaS = function MaaS(options) {
  if(!(this instanceof MaaS)) {
    return new MaaS(options);
  }

  options = options || {};

  this._accessKey = options.accessKey || '';
  this._signature = options.signature || '';
  this._encryptKey = options.encryptKey || '';

  // this._endpoint = 'http://core-api.phunware.com/v1.0';
  // Default to prod.
  this._endpoint = options._endpoint || 'https://core-api.phunware.com/v1.0';

  if(!this._accessKey || !this._signature ||  !this._encryptKey) {
    throw 'Access and signature keys required for MaaS authentication';
  }

};


MaaS.prototype.createOrg = function createorg(name, options, callback) {
  name = name || '';
  options = options || {};
  options.sigToken = options.sigToken || '';
  options.token = options.token || '';

  if(!name) return callback('Org name is required');

  var payload = {
    data: {
      name: name,
      tapit_api_token: options.token,
      tapit_signature_token: options.sigToken,
    }
  };

  var url = '/organizations';

  this._post(payload, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


/**
 * Get MaaS organization by id
 * @param  {integer}  id       Organization id
 * @param  {Function} callback
 * @return {object}
 */
MaaS.prototype.getOrg = function org(id, callback) {
  id = id || 0;

  var url = '/organizations/';
  url += parseInt(id, 10);

  this._get(null, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};



MaaS.prototype.updateOrg = function updateOrg(id, props, callback) {
  id = id || '';
  props = props || {};
  callback = callback || noop;

  if(!id) return callback('User id required');

  var url = '/organizations/';
  url += parseInt(id, 10);

  console.log(url);

  var whitelist = [
    'name',
    'tapit_api_token',
    'tapit_signature_token',
    'services',
  ];

  props = _.pick(props, whitelist);

  this._put({ data: props }, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};




// https://developer.phunware.com/pages/viewpage.action?pageId=1114138
MaaS.prototype.regUser = function regUser(options, callback) {
  options = options || {};
  callback = callback || noop;

  var url = '/users/register';
  var payload =  { data:
    {
      'user': {
        email: options.email || '',
        password: options.password || ''
      },
      'org': {
        name: options.orgName || '',
      },
      'email_url': options.email_url || '',
    }
  };

  this._post(payload, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};



MaaS.prototype.getUser = function getUser(userId, callback) {
  userId = userId || 0;
  callback = callback || noop;

  var url = '/users/';
  url += parseInt(userId, 10);

  this._get(null, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


MaaS.prototype.getUsers = function getUsers(orgId, callback) {
  orgId = orgId || 0;
  callback = callback || noop;

  var url = '/users?org_id=' + orgId;

  this._get(null, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


/**
 * Updates the user's account info
 * @param  {int}      id       User id
 * @param  {object}   props    Contains the data to be updated.
 * @param  {Function} callback
 * @return {bool}
 */
// FIXME: Should this return the updated user object?
MaaS.prototype.updateUser = function updateUser(id, props, callback) {
  id = id || '';
  props = props || {};
  callback = callback || noop;

  if(!id) return callback('User id required');

  var url = '/users/' + id;
  var whitelist =  [
    'email',
    'first_name',
    'last_name',
    'org_id',
    'orgs',
    'clients',
    'role_id',
    'google_id',
    'time_zone',
    'is_active'
  ];

  props = _.pick(props, whitelist);

  this._put({ data: props }, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


MaaS.prototype.changePassword = function changePassword(id, oldPwd, newPwd, callback) {
  id = id || '';
  oldPwd = oldPwd || '';
  newPwd = newPwd || '';
  callback = callback || noop;

  if(!id) return callback('User id required');

  var url = '/users/' + id + '/change-password';

  var props = {
    old_password: oldPwd,
    new_password: newPwd
  };

  this._put(props, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};



MaaS.prototype.resetPassword = function resetPassword(email, emailUrl, callback) {
  email = email || '';
  emailUrl = emailUrl || 'http://www.example.com/{key}';
  callback = callback || noop;

  var url = '/users/reset-password';

  var props = {
    email: email,
    email_url: emailUrl,
  };

  this._put(props, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


MaaS.prototype.resetPasswordKey = function resetPassword(password, key, callback) {
  password = password || '';
  key = key || '';
  callback = callback || noop;

  var url = '/users/reset-password/' + key;

  var props = {
    password: password,
  };

  this._put(props, url, false, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


MaaS.prototype.createUser = function createUser(data, callback) {
  data = data || {};
  callback = callback || noop;

  var url = '/users';

  var payload = {};
  payload.data = data;

  // FIXME: Validate the data.
  // {
  //     "data":
  //     {
  //         "org_id": <integer>,
  //         "role_id": <integer>,
  //         "google_id": <string>,
  //         "first_name": <string>,
  //         "last_name": <string>,
  //         "email": <string>,
  //         "time_zone": <string>,
  //         "orgs": <array>,
  //         "clients": <array>,
  //         "is_active": <integer>
  //     }
  // }
  //

  // console.log(data);
  // this._post(payload, url, true, callback);
  this._post(payload, url, true, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


/**
 * Authenticates user
 * https://developer.phunware.com/pages/viewpage.action?pageId=1114151
 * @param  {string}   email
 * @param  {string}   password
 * @param  {Function} callback
 */
MaaS.prototype.authUser = function authUser(email, password, provider, callback) {
  email = email || '';
  password = password || '';
  callback = callback || noop;

  if(typeof provider === 'function') {
    callback = provider;
    provider = 'phunware';
  };

  var url = '/users/authenticate';

  var data = {
    "provider": provider,
    "email": email,
    "expand": [ "orgs" ]
  };

  if(provider === 'google') {
    data = _.merge(data, { access_token : password });
  } else {
    data = _.merge(data, { password : password });
  }

  this._get(data, url, true, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));
};


/**
 * Retrieve a collection of clients
 * https://developer.phunware.com/display/DD/Retrieve+a+Collection+of+Clients
 * @param {int} orgId - ID of the org to get clients for.
 * @param {string} name - A string containing the rpefix or full name of clients to filter by
 * @param {array || string} id - Array of client ids to return.
 * @return {[type]} [description]
 */
MaaS.prototype.getClients = function getClients(orgId, name, ids, callback) {
  orgId = orgId || false; // int.
  name = name || false; // string
  ids = ids || false; // string or array
  callback = callback || noop;

  var url = '/clients';

  var query = {};

  if(orgId) query.org_id = orgId;
  if(name) query.name = name;
  if(ids) query.id = ids;

  console.log(query);

  this._get(query, url, true, (function(err, res) {
    this._handleResponse(err, res, callback);
  }).bind(this));

}



////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

MaaS.prototype._call = function _call(method) {
  method = method || 'GET';

  return function() {
    var args = Array.prototype.splice.call(arguments, 0);
    args.splice(0, 0, method);
    this._request.apply(this, args);
  };
};

MaaS.prototype._get = MaaS.prototype._call('GET');
MaaS.prototype._post = MaaS.prototype._call('POST');
MaaS.prototype._put = MaaS.prototype._call('PUT');
MaaS.prototype._delete = MaaS.prototype._call('DELETE');

// Review this document to make request
// https://developer.phunware.com/display/DD/Node.js+Example+for+X-Encrypted+Header
// https://developer.phunware.com/display/DD/Node.js+Example+for+Request+Authentication
MaaS.prototype._request = function _request(method, payload, url, encrypt, callback) {
  method = method || 'GET';
  payload = payload || '';
  url = url || '/test';
  encrypt = encrypt || false;
  callback = callback || noop;

  if(typeof payload !== 'string') {
    payload = JSON.stringify(payload);
  }

  var xAuthHeader = this._xAuthStr(payload, method);

  if(encrypt && payload !== '') {
    payload = this._encrypt(payload);
  }

  if(!!payload && method === 'GET') {
    url += '?' + encodeURIComponent(payload);
  }


  var options = {
    uri: url,
    baseUrl: this._endpoint,
    // json: true,
    method: method,
    headers: {
      'X-Auth': xAuthHeader,
      'X-Encrypted': !!encrypt
    },
    body: ((method !== 'GET') ? payload : ''),
  };

  // Send the request.
  // console.log(options);
  request(options, callback);
};



/**
 * Encrypts string
 * @param  {string} str String to encrypt
 * @return {string}     Encrypted string
 */
// FIXME: This doesn't appear to be working.
MaaS.prototype._encrypt = function _encrypt(str) {
  str = str || '';

  var format = 'hex';
  var iv = crypto.randomBytes(16);
  var cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(this._encryptKey, 'hex'), iv);

  return iv.toString('hex') + cipher.update(str, 'utf8', format) + cipher.final(format);
};



MaaS.prototype._xAuthStr = function _xAuthStr(payload, method) {
  payload = payload || '';
  method = method || 'GET';

  if(typeof payload !== 'string') {
    payload = JSON.stringify(payload);
  }

  var timestamp = Math.round(Date.now() / 1000);
  var sigStr =  method + '&' + this._accessKey + '&' + timestamp + '&' + payload;
  var sigHash = crypto.createHmac('sha256', this._signature).update(sigStr).digest('hex');

  return this._accessKey + ':' + timestamp + ':' + sigHash;
};


MaaS.prototype._handleResponse = function _handleResponse(err, res, callback) {
  if(err) return callback(err);

  var body = (res.body.length > 0) ? JSON.parse(res.body) : res.body;

  if(res.statusCode !== 200) {
    // Send error back.
    callback(body);
    return;
  }

  return callback(null, body);
};


module.exports = MaaS;
