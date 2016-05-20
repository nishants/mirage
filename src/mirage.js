var express = require('express'),
    mappings = require('./url-mapping'),
    app = express();

module.exports  = {
  start: function(){
    return app;
  },
  get: function(url){
    var mapping = mappings.create();
    app.get(url, mapping.send());
    return mapping;
  }
}