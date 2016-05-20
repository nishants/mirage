var express = require('express'),
    mappings = require('./url-mapping'),
    bodyParser = require('body-parser'),
    app = express();

module.exports  = {
  start: function(){
    app.use(bodyParser.json());
    return app;
  },
  get: function(url){
    var mapping = mappings.create();
    app.get(url, mapping.send());
    return mapping;
  },
  post: function(url){
    var mapping = mappings.create();
    app.post(url, mapping.send());
    return mapping;
  }
}