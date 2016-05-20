var sendFile = function(path){
  return {
    path: path,
    send:function(req, res){
      return res.status(200).json({
        message: "hello",
        id: "1"
      });
    }
  }
  ;
};

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