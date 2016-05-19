var expect  = require('chai').expect,
    mirage  = require("../src/mirage");
    // fixture = require("fixture");

describe('Mirage', function() {
  describe('should exist', function () {
    it('should return -1 when the value is not present', function (done) {
      expect(mirage.say()).to.equal("hello");
      done();
    });
  });
});