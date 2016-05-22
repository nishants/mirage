var sendFile    = require("./send-file"),
    controllers = require("./controllers");

module.exports  = {
  create: function(){
    return {
      _action     : null,
      _controller : null,
      send: function(){
        var self = this;
        return function(req, res){
          var controller = self._controller || controllers.none();
          return self._action.send(req, res);
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