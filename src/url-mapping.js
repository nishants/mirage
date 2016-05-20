module.exports  = {
  create: function(){
    return {
      file: undefined,
      send: function(){
        var self = this;
        return function(req, res){
          res.status(200).json({
            name: 'i can see you!',
            path: self.file
          })
        }
      },
      sendFile: function(path){
        this.file = path;
      }
    };
  }
}