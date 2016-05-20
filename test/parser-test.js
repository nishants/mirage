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
    var expected    = "parsed",
        scope       = fakeScope({"id" : "parsed"}),
        template = {
          id: "{{id}}"
        },
        result = parser.parse(scope, template);

    expect(result.id).to.equal(expected);
  });
});