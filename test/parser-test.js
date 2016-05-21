var expect  = require('chai').expect,
    scopes  = require("../src/scope"),
    parser  = require("../src/compiler/compiler"),
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
        parsed   = parser.compile(scope, template);

    expect(parsed.id).to.equal("my-some-id");
  });

  it('should parse sub trees', function () {
    var scope       = fakeScope({"id" : "some-id"}),
        template = {item: {id: "my-{{id}}"}},
        parsed   = parser.compile(scope, template);

    expect(parsed.item.id).to.equal("my-some-id");
  });

  it('should parse complex sub trees', function () {
    var scope       = fakeScope({
          "item.id"      : "one",
          "item.name"    : "me",
          "item.address" : "home"
        }),
        template = {
          item: {
            id      : "id is {{item.id}}",
            name    : "name is {{item.name}}",
            address : {
              street : "street is {{item.address}}"
            }
          }},
        parsed   = parser.compile(scope, template);

    expect(parsed.item.id).to.equal("id is one");
    expect(parsed.item.name).to.equal("name is me");
    expect(parsed.item.address.street).to.equal("street is home");
  });

});