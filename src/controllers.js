var scopes    = require("./scope"),
    Controller = function(){};

Controller.prototype.service= function(req, res, action){
  action.send(req, res, scopes.create({request: {body: req.body, path: req.params, query: req.query}}));
}

module.exports  = {
  create: function(controller){
    return new Controller();
  },
  none : function(){
    return new Controller();
  }
}