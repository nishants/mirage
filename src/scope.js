var execute = function (scope, expression) {
  var contextScript = "";
  for (var field in scope) {
    contextScript += ("var <field> = this.<field>;".replace("<field>", field).replace("<field>", field));
  }
  scope.execute = function () {
    return eval(contextScript + "eval('<expression>');".replace("<expression>", expression));
  };
  return scope.execute();
};
module.exports = {
  create : function(scope){
    var scope = scope;
    return {
      execute: function(expression){
        return execute(scope, expression);
      }
    };
  }
};