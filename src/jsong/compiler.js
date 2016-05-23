var linker = require("./linker"),
    directives = require("./directives");

module.exports = {
  compile: function (scope, template) {
    var result = {},
        hasDirective= function(){
          for(var field in template){
            if(field.startsWith("@")) {
              return true;
            }
          }
          return false;
        },
        self = this,
        compile = function(scope, template){
          return self.compile(scope, template);
        };

    if(hasDirective()) {
      return directives.link(scope, template, compile);
    }

    for (var node in template) {
      var value       = template[node],
          isSubtree   = (typeof value == "object");

      result[node] = isSubtree ? this.compile(scope, value) : linker.link(scope, value);
    }
    return result;
  }
};