var fs        = require("fs"),
    scopes    = require("./scope"),
    compiler  = require("./compiler/compiler");

var sendFile = function (path) {
      return {
        path: path,
        send: function (req, res) {
          var scope       = scopes.create({request: {body: req.body, path: req.params, query: req.query}}),
              template    = JSON.parse(fs.readFileSync(this.path)),
              parsed      = compiler.compile(scope, template),
              headers     = parsed.headers,
              responseBody= parsed.body;

          for(var header in headers){
            res.set(header, headers[header]);
          }
          return res.status(200).json(responseBody);
        }
      };
    };

module.exports = sendFile;