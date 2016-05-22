var all = {
  "@repeat": {
    scope: true,
    link: function(scope, element, param){
      var varName   =  param.split("in")[0].trim(),
          listName  = param.split("in")[1].trim(),
          list      = scope.execute(listName),
          parsed    = [];

      for(var index = 0;index < list.length; index ++){
        var params = {};
        params[varName]   = list[index];
        params["$index"]  = index+"";
        var newScope      = scope.createChild(params);
        parsed[index]     = require("./compiler").compile(newScope, element)
      }

      return parsed;
    }
  }
};

module.exports = {
  all: all,
  get: function(name){
    return all[name];
  },
  link: function(scope, template, param){
    var directives = [];
    for(var field in template){
      field.startsWith("@") && directives.push(all[field]);
    }
    for(var directive in directives){
      template =  directive.link(scope, template, delete template[field]);
    }
    return template;
  },

  on: function (name) {
    return {
      link: function(scope, element, param){
        delete element[name];
        return all[name] ? all[name].link(scope, element, param) : function(){};
      }
    };
  }};