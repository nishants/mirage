var expect  = require('chai').expect,
    injector;

describe('Injector Test', function() {
  beforeEach(function(){
    injector  = require("../src/injector").create();
  });

  it('Should Inject Dependencies', function(done) {
    var serviceOne = [function () {
          return {
            name: "service-one"
          };
        }],
        serviceTwo = [function () {
          return {
            call: function () {
              return "service-two";
            }
          };
        }];

    injector.add("serviceOne", serviceOne);
    injector.add("serviceTwo", serviceTwo);
    injector.init();

    var injected = injector.inject(["serviceOne", "serviceTwo", function(one, two){
      expect(one.name).to.equal("service-one");
      expect(two.call()).to.equal("service-two");
      done();
    }]);
    injected.call();
  });

  //it('Should support interdependent services', function(done) {
  //  var serviceOne = ["serviceTwo", function(two){
  //        return {
  //          fromOne: function(){
  //            return "from-one";
  //          },
  //          call: function(){
  //            return "service-one-" + two.name;
  //          }
  //        };
  //      }],
  //      serviceTwo = ["serviceOne", function(one){
  //        return {
  //          name: "from-two",
  //          call: function(){
  //            return "service-two-" + one.fromOne();
  //          }
  //        };
  //      }];
  //
  //  injector.add("serviceOne", serviceOne);
  //  injector.add("serviceTwo", serviceTwo);
  //  injector.init();
  //  injector.init();
  //  injector.init();
  //
  //  var injected = injector.inject(["serviceOne", "serviceTwo", function(one, two){
  //    expect(two.call()).to.equal("service-two-from-one");
  //    expect(one.call()).to.equal("service-one-from-two");
  //    done();
  //  }]);
  //  injected.call();
  //});

  it('Should allow cyclic dependencies', function(done) {

    var oneInitialized = false,
        twoInitialized = false,
        serviceOne = ["serviceTwo", function(two){
          oneInitialized = true;
          return {
            name: "service-one"
          };
        }],
        serviceTwo = ["serviceOne", function(one){
          twoInitialized = true;
          return {
            name: "service-two"
          };
        }],
        assert = function () {
          expect(oneInitialized).to.equal(true);
          expect(twoInitialized).to.equal(true);
          done();
        };

    injector.add("serviceOne", serviceOne);
    injector.add("serviceTwo", serviceTwo);

    injector.init();

    setTimeout(assert, 1000);
  });
});