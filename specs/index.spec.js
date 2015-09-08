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
    expect(maas._endpoint).toNotBe(null);
    expect(maas._endpoint).toNotBe('');
  });

});