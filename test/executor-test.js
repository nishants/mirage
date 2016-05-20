var expect  = require('chai').expect,
    execute  = require("../src/executer");

describe('Execute JS', function() {
  it('should inject fields with primary values to context', function () {
    var scope      = {id: 1},
        expression = "id + 99";
    expect(execute.execute(scope, expression)).to.equal(100);
  });

  it('should allow operation on context values', function () {
    var scope      = {id: 1, name: "Vijay"},
        expression = '(id + 99) + "-" + name';
    expect(execute.execute(scope, expression)).to.equal("100-Vijay");
  });

  it('should not update context values', function () {
    var scope      = {id: 1, name: "Vijay"},
        expression = 'id = 2';
    expect(execute.execute(scope, expression)).to.equal(2);
    expect(scope.id).to.equal(1);
  });

});