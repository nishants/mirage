var expect  = require('chai').expect,
    fixture = require("./support/fixture"),
    fs      = require("fs");

describe('Mirage', function() {
  it('should return a simple response', function (done) {
    var file = fixture.file("hello");
    expect(file.body.message).to.equal("hello");
    done();
  });

  it('should read a sample', function (done) {
    var sample = fixture.sample("controller");
    expect(sample.requestBody().name).to.equal("You");
    expect(sample.responseBody().message).to.equal("Controllified !");
    expect(sample.templatePath()).to.equal("sample/controller/template.json");
    done();
  });
});