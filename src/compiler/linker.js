module.exports = {
  link: link = function(scope, node, nodeValue){
    var isString        = (typeof nodeValue == "string"),
        isSubtree       = (typeof nodeValue == "object"),
        hasExpressions  = isString ? nodeValue.indexOf("{{") != -1 : false,
        expression      = hasExpressions ? nodeValue.split("{{")[1].split("}}")[0] : null,
        expressionValue = expression ? scope.execute(expression) : null,
        parsed          = expressionValue ? nodeValue.replace("{{"+expression+"}}", expressionValue) : nodeValue;

    return parsed = isSubtree ? require("./parser").parse(scope, nodeValue) : parsed;
  }
};