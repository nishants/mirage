var linker = require("./linker"),
    directives = require("./directives");

module.exports = {
  compile: function (scope, template) {
    var result = {},
        hasDirective= function(){
          for(var field in template[node]){
            if(node.startsWith("@")) return true;
          }
          return false;
        };

    //if(hasDirective()) {return directives.link(scope, template);}

    for (var node in template) {
      var value       = template[node],
          isSubtree   = (typeof value == "object");

      result[node] = isSubtree ? this.compile(scope, value) : linker.link(scope, value);
    }
    return result;
  }
};