var allDirectives = {
      "@repeat": {
        scope: true,
        link: function(scope, element){
          require("./compiler").compile(scope, element);
        }
      }
    },
    directivesOn = function (element) {
    var directives =[];
    for(var child in element){
      child.startsWith("@") ? directives.push({
        directive: allDirectives[child],
      }) && (delete element[child]) :"";
    }
    return {
      list: directives,
      link: function(scope, element){
        return directives.length ? directives[0].link(scope, element) : require("./compiler").compile(scope, element);
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