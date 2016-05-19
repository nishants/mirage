var expect  = require('chai').expect,
    mirage  = require("../src/mirage"),
    fixture = require("./support/fixture");

describe('Mirage', function() {
  it('should return a simple response', function (done) {
    var file = JSON.parse(fixture.file("hello"));
    expect(file.response.body).to.equal("hello");
    done();
  });
});