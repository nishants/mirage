var expect  = require('chai').expect,
    injector;

describe('Injector Test', function() {
  beforeEach(function(){
    injector  = require("../src/injector").create();
  });

  it('Should Inject Dependencies', function(done) {
    var serviceOne   = {name: "service-one"},
        serviceTwo   = {call: function(){return "service-two";}},
        dependencies = ["serviceOne", "serviceTwo"],
        target = function(one, two){
          expect(one.name).to.equal("service-one");
          expect(two.call()).to.equal("service-two");
          done();
        };

    injector.add("serviceOne", serviceOne);
    injector.add("serviceTwo", serviceTwo);

    var injected = injector.inject(["serviceOne", "serviceTwo", target])
    injected.call();
  });
});