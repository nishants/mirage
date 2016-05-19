var fs = require("fs");

module.exports = {
  file: function (path) {
    return fs.readFileSync("sample/<path>.json".replace("<path>", path));
  }
}