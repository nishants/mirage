var expect  = require('chai').expect,
    scope  = require("../src/scope");

describe('Execute JS', function() {
  it('should inject fields with primary values to context', function () {
    var expression = "id + 99";
    expect(scope.execute({id: 1}, expression)).to.equal(100);
  });

  it('should allow operation on context values', function () {
    var expression = '(id + 99) + "-" + name';
    expect(scope.execute({id: 1, name: "Vijay"}, expression)).to.equal("100-Vijay");
  });

  it('should not update context values', function () {
    var expression = 'id = 2';
    var subScope = {id: 1, name: "Vijay"};
    expect(scope.execute(subScope, expression)).to.equal(2);
    expect(subScope.id).to.equal(1);
  });

  it('should inject object fields', function () {
    var expression = 'data.id + "-" + data.address.street';

    expect(scope.execute({data: {id: 1, address: {street: "my-home"}}}, expression)).to.equal("1-my-home");
  });

});