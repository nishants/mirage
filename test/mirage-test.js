var expect  = require('chai').expect,
    http    = require("http"),
    fixture = require("./support/fixture"),
    mirage  = require("../src/mirage"),
    request = require('supertest');

describe('Mirage', function() {
  it('should parse expressions in response and add request to scope', function (done) {
    var app     = mirage.start();

    //mirage.filesFrom("../sample");
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

    //mirage.filesFrom("../sample");
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
});