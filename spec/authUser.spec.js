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

    spyOn(maas, 'authUser').and.callThrough();
    maas.authUser('nloveridge@phunware.com', 'demotime', callback);

    expect(maas.authUser).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(data.method).toBe('GET');
    expect(data.uri).toBe('/users/authenticate');
    expect(data.encrypt).toBe(true);
    expect(data.payload.provider).toBe('phunware');
    expect(data.payload.email).toBe('nloveridge@phunware.com');
    expect(data.payload.password).toBe('demotime');

  });

});

