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

  it("should get the organization's info from the MaaS API", function() {
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

    spyOn(maas, 'getOrg').and.callThrough();
    maas.getOrg(58, callback);

    expect(maas.getOrg).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(data.method).toBe('GET');
    expect(data.uri).toBe('/organizations/58');
    expect(data.encrypt).toBe(false);

  });

});

