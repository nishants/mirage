var expect  = require('chai').expect,
    mirage  = require("../src/mirage"),
    fixture = require("./support/fixture"),
    request = require('supertest'),
    app;

describe('Mirage', function() {
  beforeEach(function(){
    app = mirage.create();
  });

  it('should parse expressions in json template', function (done) {
    app.get("/user").sendFile("sample/hello.json");

    request(app.app)
        .get("/user", "")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.message).to.equal("hello");
          expect(res.body.id).to.equal(1);
          done();
        });
  });

  it('should add request header in template scope', function (done) {
    app.get("/user").sendFile("sample/headers.json");

    request(app.app)
        .get("/user", "")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.header["my-header"]).to.equal("Hello World!");
          done();
        });
  });

  it('should add request body in template scope', function (done) {
    app.post("/user").sendFile("sample/create.json");

    request(app.app)
        .post("/user")
        .send({name: "My User", address: {street: "My Home"}})
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.id).to.equal("1");
          expect(res.body.name).to.equal("My User");
          expect(res.body.address.street).to.equal("My Home");
          done();
        });
  });

  it('should add request path param to template scope', function (done) {
    app.get("/user/:id").sendFile("sample/request-path-param.json");

    request(app.app)
        .get("/user/21")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.id).to.equal("21");
          done();
        });
  });


  it('[path-parameter] should add path params to template scope', function (done) {
    var sample = fixture.sample("path-param");

    app.get("/user/:id")
        .sendFile(sample.templatePath());

    request(app.app)
        .get("/user/1001001")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(sample.responseBody());
          done();
        });
  });

  it('[url-parameter] should add url params to template scope', function (done) {
    var sample = fixture.sample("url-param");

    app.get("/url-param")
        .sendFile(sample.templatePath());

    request(app.app)
        .get("/url-param?search=who wat that&page=1&size=10")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(sample.responseBody());
          done();
        });
  });

  it('[controller] should support returning data from controller', function (done) {
    var controller = fixture.sample("controller");
    app.get("/controller")
        .sendFile(controller.templatePath())
        .controller(function(scope){
          scope.message = "Controllified !";
        });
    request(app.app)
        .get("/controller")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.eql(controller.responseBody());
          done();
        });
  });

  describe('InBuilt Directives', function() {
    it('[repeater] should support @repeat directive', function (done) {
      var repeater = fixture.sample("repeater");
      app.get("/repeater").sendFile(repeater.templatePath());

      request(app.app)
          .get("/repeater")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.eql(repeater.responseBody());
            done();
          });
    });
  });

});