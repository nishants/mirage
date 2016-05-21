function directivesOn(element) {
  var directives =[];
  for(var child in element){
    child.startsWith("@") ? directives.push(element[child]) && (delete element[child]) :"";
  }
  return {
    list: directives,
    link: function(scope, element){
      return require("./compiler").compile(scope, element);
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

    return parsed = isSubtree ? directivesOn(element).link(scope, element) : parsed;
  }
};