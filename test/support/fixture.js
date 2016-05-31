var fs = require("fs");

module.exports = {
  file: function (path) {
    return JSON.parse(fs.readFileSync("sample/<path>.json".replace("<path>", path)));
  }
}