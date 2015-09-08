var MaaS = require(__dirname + '/../index.js');

var keys = {
  accessKey: 'testAccessKey',
  signature: 'testSignatureKey',
  encryptKey: 'testEncyptionKey'
};

describe('MaaS Get User', function() {
  var maas;

  beforeEach(function() {
    maas = new MaaS(keys);
  });

  it("should auth the user on the MaaS API", function() {
    var data = {};
    var callback = jasmine.createSpy('callback');

    spyOn(maas, '_request').and.callFake(function(method, payload, uri, encrypt, callback) {
      console.log(payload);
      data.method = method;
      data.payload = payload;
      data.uri = uri;
      data.encrypt = encrypt;

      var res = {
        statusCode: 200,
        body: JSON.stringify({}),
      };

      return callback(null, res);
    });

    var payload = {
      first_name: 'Bob',
      last_name: 'Vila',
      invalid: 'nothingHere',
    };

    spyOn(maas, 'updateUser').and.callThrough();
    maas.updateUser(1, payload, callback);

    expect(maas.updateUser).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(data.method).toBe('PUT');
    expect(data.uri).toBe('/users/1');
    expect(data.encrypt).toBe(false);
    expect(data.payload.data.first_name).toBe('Bob');
    expect(data.payload.data.first_name).toBe('Vila');
    // FIXME: Build out all other prop tests.
    expect(data.payload.data.hasOwnProperty('invalid')).toBe(false);

  });

});

