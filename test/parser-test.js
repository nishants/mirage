var expect  = require('chai').expect,
    scopes  = require("../src/scope"),
    parser  = require("../src/parser"),
    fakeScope = function(expressions){
      return {
        execute: function(expression){
          return expressions[expression]
        }
      };
    };

describe('Parse JSO-NG', function() {

  it('should find, execute and replace expressions by there values', function () {
    var scope       = fakeScope({"id" : "some-id"}),
        template = {id: "my-{{id}}"},
        parsed   = parser.parse(scope, template);

    expect(parsed.id).to.equal("my-some-id");
  });

  it('should parse sub trees', function () {
    var scope       = fakeScope({"id" : "some-id"}),
        template = {item: {id: "my-{{id}}"}},
        parsed   = parser.parse(scope, template);

    expect(parsed.item.id).to.equal("my-some-id");
  });

  it('should parse complex sub trees', function () {
    var scope       = fakeScope({
          "id"      : "some-id",
          "name"    : "some-name",
          "address" : "some-address"
        }),
        template = {
          item: {
            id      : "my-{{id}}",
            name    : "my-{{name}}",
            address : "my-{{address}}"
          }},
        parsed   = parser.parse(scope, template);

    expect(parsed.item.id).to.equal("my-some-id");
    expect(parsed.item.name).to.equal("my-some-name");
    expect(parsed.item.address).to.equal("my-some-address");
  });

});