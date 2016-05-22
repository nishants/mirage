module.exports = {
  link: link = function(scope, element){
    var isString        = (typeof element == "string"),
        hasExpressions  = isString ? element.indexOf("{{") != -1 : false,
        expression      = hasExpressions ? element.split("{{")[1].split("}}")[0] : null,
        expressionValue = expression ? scope.execute(expression) : null;

    return expressionValue ? element.replace("{{"+expression+"}}", expressionValue) : element;
  }
};