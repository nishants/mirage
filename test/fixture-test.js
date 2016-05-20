var expect  = require('chai').expect,
    fixture = require("./support/fixture");

describe('Mirage', function() {
  it('should return a simple response', function (done) {
    var file = fixture.file("hello");
    expect(file.body.message).to.equal("hello");
    done();
  });
});