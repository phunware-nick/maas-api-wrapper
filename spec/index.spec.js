var MaaS = require(__dirname + '/../index.js');

var keys = {
  accessKey: 'testAccessKey',
  signature: 'testSignatureKey',
  encryptKey: 'testEncyptionKey'
};

describe('MaaS Class', function() {
  var maas;

  beforeEach(function() {
    maas = new MaaS(keys);
  });

  it("Should store the keys as props on instance", function() {
    expect(maas._accessKey).toBe(keys.accessKey);
    expect(maas._signature).toBe(keys.signature);
    expect(maas._encryptKey).toBe(keys.encryptKey);
  });

  it("Should have an endpoint url stored as a property", function() {
    expect(maas._endpoint).not.toBeFalsy();
  });

  it("Should have the createOrg method", function() {
    expect('createOrg' in maas).toBe(true);
  });

  it("Should have the getOrg method", function() {
    expect('getOrg' in maas).toBe(true);
  });

  it("Should have the regUser method", function() {
    expect('regUser' in maas).toBe(true);
  });

  it("Should have the getUser method", function() {
    expect('getUser' in maas).toBe(true);
  });

  it("Should have the updateUser method", function() {
    expect('updateUser' in maas).toBe(true);
  });

  it("Should have the authUser method", function() {
    expect('authUser' in maas).toBe(true);
  });

  it("Should get the user's info from the MaaS API", function() {
    var args;
    var callback = jasmine.createSpy('callback');

    spyOn(maas, '_request').and.callFake(function() {
      args = arguments;
    });

    spyOn(maas, 'getUser');
    maas.getUser(61, callback);

    expect(maas.getUser).toHaveBeenCalled();
    // expect(callback).toHaveBeenCalled();

  });

});

