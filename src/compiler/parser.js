var link = function(scope, node, nodeValue){
      var isString        = (typeof nodeValue == "string"),
          isSubtree       = (typeof nodeValue == "object"),
          hasExpressions  = isString ? nodeValue.indexOf("{{") != -1 : false,
          expression      = hasExpressions ? nodeValue.split("{{")[1].split("}}")[0] : null,
          expressionValue = expression ? scope.execute(expression) : null,
          parsed          = expressionValue ? nodeValue.replace("{{"+expression+"}}", expressionValue) : nodeValue;

      return parsed = isSubtree ? parse(scope, nodeValue) : parsed;
    },
    parse = function (scope, template) {
      var result = {};
      for (var node in template) {
        result[node] = link(scope, node,  template[node]);
      }
      return result;
    };

module.exports = {
  parse : function(scope, template){
    return parse(scope, template);
  }
};