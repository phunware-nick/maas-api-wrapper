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

  it("should get the user's info from the MaaS API", function() {
    var data = {};
    var callback = jasmine.createSpy('callback');

    spyOn(maas, '_request').and.callFake(function(method, payload, uri, encrypt, callback) {
      data.method = method;
      data.uri = uri;
      data.encrypt = encrypt;

      var res = {
        statusCode: 200,
        body: JSON.stringify({}),
      };

      return callback(null, res);
    });

    spyOn(maas, 'getUser').and.callThrough();
    maas.getUser(61, callback);

    expect(maas.getUser).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(data.method).toBe('GET');
    expect(data.uri).toBe('/users/61');
    expect(data.encrypt).toBe(false);

  });


  it("should handle errors from the MaaS API", function() {
    var data = {};
    var callback = jasmine.createSpy('callback');

    spyOn(maas, '_request').and.callFake(function(method, payload, uri, encrypt, callback) {
      data.method = method;
      data.uri = uri;
      data.encrypt = encrypt;

      var res = {
        statusCode: 401,
        error: { message: 'Not Authorized' },
      };

      return callback(res, null);
    });

    spyOn(maas, 'getUser').and.callThrough();
    maas.getUser(1, callback);

    expect(maas.getUser).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(data.method).toBe('GET');
    expect(data.uri).toBe('/users/1');
    expect(data.encrypt).toBe(false);

  });

});

