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

});