var linker = require("./linker");

module.exports = {
  parse: function (scope, template) {
    var result = {};
    for (var node in template) {
      result[node] = linker.link(scope, node,  template[node]);
    }
    return result;
  }
};