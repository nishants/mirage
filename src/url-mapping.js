var sendFile    = require("./send-file"),
    controllers = require("./controllers");

module.exports  = {
  create: function(){
    return {
      _action     : null,
      _controller : null,
      service: function(){
        var self = this;
        return function(req, res){
          var controller = self._controller || controllers.none();
          return controller.service(req, res, self._action);
        }
      },
      sendFile: function(path){
        this._action = sendFile(path);
        return this;
      },
      controller: function(controller){
        this._controller = controllers.create(controller);
        return this;
      }
    };
  }
}