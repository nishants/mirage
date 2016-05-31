var expect  = require('chai').expect,
    mirage  = require("../src/mirage"),
    fixture = require("./support/fixture"),
    request = require('supertest');

describe('Mirage', function() {

  it('should parse expressions in json template', function (done) {
    var app  = mirage.create();

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
    var app  = mirage.create();

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
    var app  = mirage.create();

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
    var app  = mirage.create();

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

  it('should add url params to template scope', function (done) {
    var app  = mirage.create();
    app.get("/user").sendFile("sample/request-url-param.json");

    request(app.app)
        .get("/user"+encodeURI("?search=who wat that&page=1&size=10"))
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.search).to.equal("who wat that");
          expect(res.body.page).to.equal("1");
          expect(res.body.size).to.equal("10");
          done();
        });
  });


  it('should support returning data from controller', function (done) {
    var app  = mirage.create(),
        myController = function (scope) {
          scope.response = {
            message: "Successfully created item!.",
            items: [{name: "controllified-one"}, {name: "controllified-two"}],
          };
        };

    app.post("/controller")
          .sendFile("sample/hello-controller.json")
          .controller(myController);

    request(app.app)
        .post("/controller")
        .send({items: [{name: "one"},{name: "two"},{name: "three"}]})
        .expect("Content-Type", /json/)
        .expect(201)
        .end(function(err, res) {
          var result = res.body.items;
          expect(res.body.message).to.equal("Successfully created item!.");
          done();
        });
  });

  describe('InBuilt Directives', function() {
    it('should support @repeat directive', function (done) {
      var app  = mirage.create();
      app.get("/repeater").sendFile("sample/repeater/template.json");

      request(app.app)
          .get("/repeater")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function(err, res) {
            expect(res.body).to.eql(fixture.file("repeater/response"));
            done();
          });
    });
  });

});