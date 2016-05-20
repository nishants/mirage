var express = require('express'),
    mappings = require('./url-mapping'),
    bodyParser = require('body-parser');

module.exports  = {
  create: function(){
    var app = express()
    app.use(bodyParser.json());
    return {
      app: app,
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
    };
  }
}