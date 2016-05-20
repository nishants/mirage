module.exports = {
  create: function(){
    return {
      _injectables : {},
      add : function(name, service){
        return this._injectables[name] = service;
      },
      inject: function(definition){
        var target = definition.splice(definition.length-1)[0],
            args = [],
            injectables = this._injectables;

        definition.forEach(function(name, index){
          args[index] = injectables[name];
        });

        return {
          call: function(){
            target.apply({}, args);
          }
        };
      }
    };
  }
};