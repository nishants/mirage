var fs = require("fs"),
    scopes  = require("./scope"),
    compiler  = require("./compiler/compiler");

var sendFile = function (path) {
      return {
        path: path,
        send: function (req, res) {
          var scope       = scopes.create({request: {body: req.body, path: req.params, query: req.query}}),
              template    = JSON.parse(fs.readFileSync(this.path)),
              parsed      = compiler.compile(scope, template),
              responseBody= parsed.body;

          return res.status(200).json(responseBody);
        }
      };
    };

module.exports = sendFile;