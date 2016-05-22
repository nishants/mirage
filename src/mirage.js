var express     = require('express'),
    mappings    = require('./url-mapping'),
    bodyParser  = require('body-parser'),
    scopes      = require('../src/compiler/scope'),
    compiler    = require('../src/compiler/compiler'),
    directives  = require("../src/compiler/directives");

module.exports  = {
  create: function(){
    var app = express()
    app.use(bodyParser.json());
    return {
      app: app,
      get: function(url){
        var mapping = mappings.create();
        this.app.get(url, mapping.service());
        return mapping;
      },
      post: function(url){
        var mapping = mappings.create();
        this.app.post(url, mapping.service());
        return mapping;
      },
      directive: function(name, definition){
        return directives.add(name, definition);
      }
    };
  },
  compile: function(scope , template){
    return compiler.compile(scopes.create(scope) , template);
  }
}