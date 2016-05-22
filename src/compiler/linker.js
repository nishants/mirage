var directives = require("./directives");

module.exports = {
  link: link = function(scope, element){
    var isString        = (typeof element == "string"),
        isSubtree       = (typeof element == "object"),
        hasExpressions  = isString ? element.indexOf("{{") != -1 : false,
        expression      = hasExpressions ? element.split("{{")[1].split("}}")[0] : null,
        expressionValue = expression ? scope.execute(expression) : null,
        parsed          = expressionValue ? element.replace("{{"+expression+"}}", expressionValue) : element;

    return isSubtree ? require("./compiler").compile(scope, element) : parsed;
  }
};