var linker = require("./linker"),
    directives = require("./directives");

module.exports = {
  compile: function (scope, template) {
    var result = {};
    for (var node in template) {
      var value       = template[node],
          isSubtree   = (typeof value == "object"),
          hasDirective= function(){
            for(var field in template[node]){
              if(node.startsWith("@")) return true;
            }
            return false;
          };

      if(hasDirective()) {
        var target = template[node],
            pipe = directives.preLink(scope, target);
        pipe = this.compile(scope, pipe);
        pipe = directives.postLink(scope, pipe);
      }
      result[node] = hasDirective() ? pipe
                                    : isSubtree ? this.compile(scope, value)
                                             : linker.link(scope, value);
    }
    return result;
  }
};