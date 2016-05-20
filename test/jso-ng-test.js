var expect  = require('chai').expect,
    jsoNg  = require("../src/jso-ng"),
    fixture = require("./support/fixture");

describe('JSO-NG', function() {
  it('should parse normal json', function (done) {
    var scope = {},
        result = jsoNg.parse(fixture.file("hello"));

    expect(result.body.message).to.equal("hello");
    done();
  });
});