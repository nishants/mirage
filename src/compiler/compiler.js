var linker = require("./linker");

module.exports = {
  compile: function (scope, template) {
    var result = {};
    for (var node in template) {
      result[node] = linker.link(scope, node,  template[node]);
    }
    return result;
  }
};