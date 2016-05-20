module.exports  = {
  create: function(){
    return {
      file: undefined,
      send: function(){
        var self = this;
        return function(req, res){
          res.status(200).json({
            message: "hello",
            id: "1"
          })
        }
      },
      sendFile: function(path){
        this.file = path;
      }
    };
  }
}