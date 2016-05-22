var all = {
  //"@repeat": {
  //  scope: true,
  //  link: function(scope, element, param){
  //    var varName   =  param.split("in")[0].trim(),
  //        listName  = param.split("in")[1].trim(),
  //        list      = scope.execute(listName),
  //        parsed    = [];
  //
  //    for(var index = 0;index < list.length; index ++){
  //      var params = {};
  //      params[varName]   = list[index];
  //      params["$index"]  = index+"";
  //      var newScope      = scope.createChild(params);
  //      parsed[index]     = require("./compiler").compile(newScope, element)
  //    }
  //
  //    return parsed;
  //  }
  //}
};

module.exports = {
  all: all,
  get: function(name){
    return all[name];
  },
  add: function(name, definition){
    all[name] = {
      scope: false,
      link : definition.link
    };
  },
  link: function(scope, template){
    var directives = [];
    for(var field in template){
      field.startsWith("@") && directives.push({
        name: field,
        directive: all[field]
      });
    }
    for(var i =0; i < directives.length; i++){
      var params =  template[directives[i].name],
          directive = directives[i];

      delete template[directives[i].name];
      var replace = directives[i].directive.link(scope, template, params);
      template = replace || require("./compiler").compile(scope, template);
    }
    return template;
  },
};