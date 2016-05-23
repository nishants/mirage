var create = function(template){
      template.isDirective = function(){
        for(var field in this){
          if(field.startsWith("@")) {return true;}
        }
        return false;
      };
      return template
    };

module.exports = {
  create: function(template){
    return create(template);
  }
};