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
        return {child: "bar"};
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget.child).to.equal("bar");
  });

  it('should apply nested directives', function () {
    var scope    = scopes.create({id: 1}),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param",
              "fooTarget" : {
                "@foo" : "foo-param"
              }
            }
          }
        },
        result ;

    directives.add("@foo", {
      link: function(scope, body){
        body.child = "foodified";
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget.child).to.equal("foodified");
    expect(result.data.fooTarget.fooTarget.child).to.equal("foodified");
  });

  it('should allow executing expressoin in directive', function () {
    var scope    = scopes.create({param: "replaced by expression"}),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param",
            }
          }
        },
        result ;

    directives.add("@foo", {
      link: function(scope){
        return scope.execute("param");
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget).to.equal("replaced by expression");
  });

});
