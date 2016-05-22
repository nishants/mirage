var scopes    = require("./scope"),
    Controller = function(_ctrl){
      this._ctrl = _ctrl;
    };

Controller.prototype.service= function(req, res, action){
  var scope = {request: {body: req.body, path: req.params, query: req.query}};
  this._ctrl && this._ctrl[this._ctrl.length -1](scope);
  action.send(req, res, scopes.create(scope));
}

module.exports  = {
  create: function(controller){
    return new Controller(controller);
  },
  none : function(){
    return new Controller();
  }
}