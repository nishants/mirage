var expect  = require('chai').expect,
    injector  = require("../src/injector");

describe('Injector Test', function() {
  it('Should Inject Dependencies', function(done) {
    var serviceOne   = {name: "service-one"},
        serviceTwo   = {call: function(){return "service-two";}},
        dependencies = ["serviceOne", "serviceTwo"],
        target = function(serviceOne, serviceTwo){
          expect(serviceOne.name).to.equal("service-one");
          expect(serviceTwo.call()).to.equal("service-two");
          done();
        };

    injector.add("serviceOne", serviceOne);
    injector.add("serviceTwo", serviceTwo);

    injector.inject(["serviceOne", "serviceTwo", target]);
  });
});