var fs        = require("fs"),
    compiler  = require("jso-ng");

var sendFile = function (path) {
      return {
        path: path,
        send: function (req, res, scope) {
          var template    = JSON.parse(fs.readFileSync(this.path)),
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