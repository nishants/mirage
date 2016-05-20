var fs = require("fs"),
    scopes  = require("./scope"),
    parser  = require("./parser");

var readFile = function (path) {
      return JSON.parse(fs.readFileSync(path));
    },
    parseRequest = function(req){
      return {body: req.body, path: req.params, query: req.query};
    },
    sendFile = function (path) {
      return {
        path: path,
        send: function (req, res) {
          var scope       = scopes.create({request: parseRequest(req)}),
              template    = readFile(this.path),
              parsed      = parser.parse(scope, template),
              responseBody= parsed.body;

          return res.status(200).json(responseBody);
        }
      };
    };

module.exports = sendFile;