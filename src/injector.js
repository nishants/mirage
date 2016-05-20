module.exports = {
  _services : {},
  add : function(name, service){
    return this._services[name] = service;
  },
  inject: function(definition){
    var target = definition.splice(definition.length-1)[0],
        args = [],
        services = this._services;

    definition.forEach(function(name, index){
      args[index] = services[name];
    });

    target.apply({}, args);
  }
};