
module.exports  = {
  create: function(controller){
    return {
      service: function(req, res, action){
        action.send(req, res);
      }
    };
  },
  none : function(){
    return {
      service: function(req, res, action){
        action.send(req, res);
      }
    };
  }
}