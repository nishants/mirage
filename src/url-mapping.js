module.exports  = {
  map: function(app, url){
    return {
      sendFile: function(path){
        app.get(url, function(req, res) {
          res.status(200).json({
            name: 'i can see you!',
            path: path
          });
        })
      }
    };
  }
}