var expect    = require('chai').expect,
    temlpates = require('../../src/jsong/templates');

describe('TemplateTest', function() {
  it('template is a directive if one of its field starts with "@"', function () {
    var notHas  = temlpates.create({"id": 1, "name": "My Name"}),
        has     = temlpates.create({"id": 1, "@name": "My Name"});
    expect(notHas.isDirective()).to.equal(false);
    expect(has.isDirective()).to.equal(true);
  });
});
