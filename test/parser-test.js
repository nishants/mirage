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

describe('Execute JS', function() {

  it('should inject fields with primary values to context', function () {
    var scope       = fakeScope({"id" : "some-id"}),
        template = {
          id: "my-{{id}}"
        },
        result = parser.parse(scope, template);

    expect(result.id).to.equal("my-some-id");

  });
});