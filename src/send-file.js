var fs = require("fs"),
    scopes  = require("./scope"),
    parser  = require("./parser");

var readFile = function (path) {
      return JSON.parse(fs.readFileSync(path));
    },
    sendFile = function (path) {
      return {
        path: path,
        send: function (req, res) {
          var scope       = scopes.create({}),
              template    = readFile(this.path),
              parsed      = parser.parse(scope, template),
              resonseBody = parsed.body;

          return res.status(200).json(resonseBody);
        }
      };
    };

module.exports = sendFile;