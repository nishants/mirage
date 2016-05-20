module.exports = {
  create: function(){
    return {
      _injectables : {},
      add : function(name, service){
        return this._injectables[name] = service;
      },
      inject: function(definition){
        var target = definition.splice(definition.length-1)[0],
            self = this;

        return {
          call: function(){
            var args = [];
            definition.forEach(function(name, index){
              args[index] = self._injectables[name];
            });
            target.apply({}, args);
          }
        };
      }
    };
  }
};