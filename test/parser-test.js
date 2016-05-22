var expect  = require('chai').expect,
    mirage  = require("../src/mirage");

describe('Compile jso-ng', function() {

  it('should find, execute and replace expressions by there values', function () {
    var scope       = {"id" : "some-id"},
        template    = {id: "my-{{id}}"},
        parsed      = mirage.compile(scope, template);

    expect(parsed.id).to.equal("my-some-id");
  });

  it('should parse sub trees', function () {
    var scope       = {"id" : "some-id"},
        template = {item: {id: "my-{{id}}"}},
        parsed   = mirage.compile(scope, template);

    expect(parsed.item.id).to.equal("my-some-id");
  });
  
  it('should parse complex sub trees', function () {
    var scope       = {item: {"id": "one", "name": "me", "address": "home"}},
        template = {
          item: {
            id      : "id is {{item.id}}",
            name    : "name is {{item.name}}",
            address : {
              street : "street is {{item.address}}"
            }
          }},
        parsed   = mirage.compile(scope, template);
  
    expect(parsed.item.id).to.equal("id is one");
    expect(parsed.item.name).to.equal("name is me");
    expect(parsed.item.address.street).to.equal("street is home");
  });

});