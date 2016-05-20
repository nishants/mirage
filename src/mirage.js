var express = require('express'),
    mappings = require('./url-mapping'),
    bodyParser = require('body-parser');

module.exports  = {
  start: function(){
    var app = express()
    app.use(bodyParser.json());
    this.app = app;
    return app;
  },
  get: function(url){
    var mapping = mappings.create();
    this.app.get(url, mapping.send());
    return mapping;
  },
  post: function(url){
    var mapping = mappings.create();
    this.app.post(url, mapping.send());
    return mapping;
  }
}