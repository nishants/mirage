var expect  = require('chai').expect,
    execute  = require("../src/executer");

describe('Execute JS', function() {
  it('should inject fields with primary values to context', function (done) {
    var scope      = {id: 1},
        expression = "id + 99";
    expect(execute.execute(scope, expression)).to.equal(100);
    done();
  });
});