var expect  = require('chai').expect,
    http    = require("http"),
    Mirage = require("../src/mirage"),
    request = require('supertest');

describe('Mirage', function() {
  it('should parse expressions in json template', function (done) {
    var mirage     = Mirage.create();

    mirage.get("/user").sendFile("sample/hello.json");

    request(mirage.app)
        .get("/user", "")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.header["my-header"]).to.equal("Hello World!");
          expect(res.body.message).to.equal("hello");
          expect(res.body.id).to.equal("1");
          done();
        });
  });

  it('should add request body in template scope', function (done) {
    var mirage     = Mirage.create();

    mirage.post("/user").sendFile("sample/create.json");

    request(mirage.app)
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
    var mirage     = Mirage.create();

    mirage.get("/user/:id").sendFile("sample/request-path-param.json");

    request(mirage.app)
        .get("/user/21")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.id).to.equal("21");
          done();
        });
  });

  it('should add url params to template scope', function (done) {
    var mirage     = Mirage.create();
    mirage.get("/user").sendFile("sample/request-url-param.json");

    request(mirage.app)
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