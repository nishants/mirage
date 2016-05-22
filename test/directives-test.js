var expect  = require('chai').expect,
    scopes  = require('../src/scope'),
    compiler  = require('../src/compiler/compiler'),
    directives = require("../src/compiler/directives");

describe('Directive Definitions', function() {
  it('should replace directory body with parsed result', function () {
    var scope    = scopes.create({id: 1}),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param"
            }
          }
        },
        result ;

    directives.add("@foo", {
      link: function(scope, body, param){
        expect(param).to.equal("foo-param");
        return "bar";
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget).to.equal("bar");
  });

  it('should replace directory body with a subtree', function () {
    var scope    = scopes.create({id: 1}),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param"
            }
          }
        },
        result ;

    directives.add("@foo", {
      link: function(scope, body, param){
        expect(param).to.equal("foo-param");
        return {child: "bar"};
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget.child).to.equal("bar");
  });

});
