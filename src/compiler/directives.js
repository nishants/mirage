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
  search: function (element) {
    var found =[];
    for(var child in element){
      child.startsWith("@") ? found.push({
        directive: all[child],
        param: element[child],
      }) && (delete element[child]) :"";
    }
    return {
      list: found,
      link: function(scope, element){
        return this.list.length ? this.list[0].directive.link(scope, element, this.list[0].param) : require("./compiler").compile(scope, element);
      }
    };
  }};