var expect  = require('chai').expect,
    http    = require("http"),
    fixture = require("./support/fixture"),
    mirage  = require("../src/mirage"),
    request = require('supertest');

describe('Mirage', function() {
  it('should parse expressions in response and add request to scope', function (done) {
    var app     = mirage.start();

    mirage.get("/user").sendFile("../sample/hello.json");

    request(app)
        .get("/user", "")
        .expect("Content-Type", /json/)
        .expect("Content-Length", "15")
        .expect(200)
        .end(function(err, res) {
          expect(res.body.name).to.equal("i can see you!");
          expect(res.body.path).to.equal("../sample/hello.json");
          done();
        });
  });
});