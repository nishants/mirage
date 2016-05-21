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

var Scope = function(scope){
  this.$scope = scope;
};

Scope.prototype.execute = function(expression){
  return execute(this.$scope, expression);
};

module.exports = {
  create : function(scope){
    return new Scope(scope);
  }
};
