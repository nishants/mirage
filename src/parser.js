var parse = function (scope, template) {
  var result = {};
  // find and replace expressions with there resulting values.
  for (var node in template) {
    var nodeValue       = template[node],
        isString        = (typeof nodeValue == "string"),
        hasExpressions  = isString ? nodeValue.indexOf("{{") != -1 : false,
        expression      = hasExpressions ? nodeValue.split("{{")[1].split("}}")[0] : null,
        expressionValue = expression ? scope.execute(expression) : null,
        replace         = expressionValue ? nodeValue.replace("{{"+expression+"}}", expressionValue) : nodeValue;

    result[node] = replace;
  }

  return result;
};
module.exports = {
  parse : function(scope, template){
    return parse(scope, template);
  }
};