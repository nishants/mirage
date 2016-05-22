var expect    = require('chai').expect,
    mirage    = require('../src/mirage'),
    scopes    = require('../src/scope'),
    compiler  = require('../src/compiler/compiler');

describe('Directive Definitions', function() {
  it('should replace directory body with parsed result', function () {
    var scope    = scopes.create({id: 1}),
        app       = mirage.create(),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param"
            }
          }
        },
        result ;

    app.directive("@foo", {
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
        app       = mirage.create(),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param"
            }
          }
        },
        result ;

    app.directive("@foo", {
      link: function(scope, body, param){
        return {child: "bar"};
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget.child).to.equal("bar");
  });

  it('should apply nested directives', function () {
    var scope    = scopes.create({id: 1}),
        app       = mirage.create(),
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

    app.directive("@foo", {
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
        app       = mirage.create(),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param",
            }
          }
        },
        result ;

    app.directive("@foo", {
      link: function(scope){
        return scope.execute("param");
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget).to.equal("replaced by expression");
  });

  it('should allow directives in template returned from directive', function () {
    var scope    = scopes.create({param: "found"}),
        app       = mirage.create(),
        template = {
          "data" : {
            "fooTarget" : {
              "@foo" : "foo-param"
            }
          }
        },
        result ;

    app.directive("@foo", {
      link: function(scope, body, param, compile){
        return compile(scope, {
          child: "{{param}}",
          "@bar": "bar-param",
        });
      }
    });

    app.directive("@bar", {
      link: function(scope, body, param){
        body.otherChild = "bar";
        expect(param).to.equal("bar-param");
      }
    });

    result = compiler.compile(scope, template);
    expect(result.data.fooTarget.child).to.equal("found");
    expect(result.data.fooTarget.otherChild).to.equal("bar");
  });

});
