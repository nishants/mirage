var sendFile = require("./send-file");

module.exports  = {
  create: function(){
    return {
      _action : undefined,
      send: function(){
        var self = this;
        return function(req, res){
          return self._action.send(req, res);
        }
      },
      sendFile: function(path){
        this._action = sendFile(path);
      }
    };
  }
}