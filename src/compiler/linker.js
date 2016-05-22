var directives = require("./directives");

var allDirectives = directives.all,
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