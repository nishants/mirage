var linker = require("./linker"),
    directives = require("./directives");

module.exports = {
  compile: function (scope, template) {
    var result = {};
    for (var node in template) {
      var value       = template[node],
          isSubtree   = (typeof value == "object"),
          isDirective = node.startsWith("@");

      result[node] = isDirective ? directives.search(value).link(scope, value)
                                 : linker.link(scope, template[node]);
      
    }
    return result;
  }
};