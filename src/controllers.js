var scopes    = require("./scope");

module.exports  = {
  create: function(controller){
    return {
      service: function(req, res, action){
        action.send(req, res, scopes.create({request: {body: req.body, path: req.params, query: req.query}}));
      }
    };
  },
  none : function(){
    return {
      service: function(req, res, action){
        action.send(req, res, scopes.create({request: {body: req.body, path: req.params, query: req.query}}));
      }
    };
  }
}