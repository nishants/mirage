var expect  = require('chai').expect,
    scopes = require("../src/scope");

describe('Execute JS', function() {

  it('should inject fields with primary values to context', function () {
    var expression  = "id + 99",
        scope       = scopes.create({id: 1});

    expect(scope.execute(expression)).to.equal(100);
  });

  it('should allow operation on context values', function () {
    var expression = '(id + 99) + "-" + name',
        scope      = scopes.create({id: 1, name: "Vijay"});
    expect(scope.execute(expression)).to.equal("100-Vijay");
  });

  it('should not update context values', function () {
    var injected    = {id: 1, name: "Vijay"},
        expression  = 'id = 2',
        scope       = scopes.create(injected);
    expect(scope.execute(expression)).to.equal(2);
    expect(injected.id).to.equal(1);
  });

  it('should inject object fields', function () {
    var expression = 'data.id + "-" + data.address.street',
        scope       = scopes.create({data: {id: 1, address: {street: "my-home"}}});
    expect(scope.execute(expression)).to.equal("1-my-home");
  });
});