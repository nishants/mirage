var expect  = require('chai').expect,
    http    = require("http"),
    fixture = require("./support/fixture"),
    mirage  = require("../src/mirage"),
    request = require('supertest');

describe('Mirage', function() {
  it('should parse expressions in response and add request to scope', function (done) {
    var app     = mirage.start();

    mirage.get("/user").sendFile("sample/hello.json");

    request(app)
        .get("/user", "")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.message).to.equal("hello");
          expect(res.body.id).to.equal("1");
          done();
        });
  });

  it('should add request body in template scope', function (done) {
    var app     = mirage.start();

    mirage.post("/user").sendFile("sample/create.json");

    request(app)
        .post("/user", {name: "My User", address: {street: "My Home"}})
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
    var app     = mirage.start();

    mirage.get("/user/:id").sendFile("sample/request-path-param.json");

    request(app)
        .get("/user/21")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.id).to.equal("21");
          done();
        });
  });

  it('should add url params to template scope', function (done) {
    var app     = mirage.start();

    mirage.get("/user").sendFile("sample/request-url-param.json");

    request(app)
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

});