var MaaS = require(__dirname + '/../index.js');

var keys = {
  accessKey: 'testAccessKey',
  signature: 'testSignatureKey',
  encryptKey: 'testEncyptionKey'
};

describe('MaaS change password', function() {
  var maas;

  beforeEach(function() {
    maas = new MaaS(keys);
  });

  it("should change the user's password via the MaaS API", function() {
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

    spyOn(maas, 'changePassword').and.callThrough();
    maas.changePassword(1, 'oldpwd', 'newpwd', callback);

    expect(maas.changePassword).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(data.method).toBe('PUT');
    expect(data.uri).toBe('/users/1/change-password');
    expect(data.encrypt).toBe(false);
    expect(data.payload.old_password).toBe('oldpwd');
    expect(data.payload.new_password).toBe('newpwd');

  });

});
