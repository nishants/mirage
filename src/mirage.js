var express = require('express'),
    app = express();

module.exports  = {
  start: function(){
    return app;
  },
  get: function(url){
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