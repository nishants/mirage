var express = require('express'),
    mapping = require('./url-mapping'),
    app = express();

module.exports  = {
  start: function(){
    return app;
  },
  get: function(url){
    return mapping.map(app, url);
  }
}