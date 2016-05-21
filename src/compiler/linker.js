var allDirectives = {
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
    },
    directivesOn = function (element) {
    var directives =[];
    for(var child in element){
      child.startsWith("@") ? directives.push({
        directive: allDirectives[child],
        param: element[child],
      }) && (delete element[child]) :"";
    }
    return {
      list: directives,
      link: function(scope, element){
        return this.list.length ? this.list[0].directive.link(scope, element, this.list[0].param) : require("./compiler").compile(scope, element);
      }
    };
};

module.exports = {
  link: link = function(scope, element){
    var isString        = (typeof element == "string"),
        isSubtree       = (typeof element == "object"),
        hasExpressions  = isString ? element.indexOf("{{") != -1 : false,
        expression      = hasExpressions ? element.split("{{")[1].split("}}")[0] : null,
        expressionValue = expression ? scope.execute(expression) : null,
        parsed          = expressionValue ? element.replace("{{"+expression+"}}", expressionValue) : element;

    return isSubtree ? directivesOn(element).link(scope, element) : parsed;
  }
};