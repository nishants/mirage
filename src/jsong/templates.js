var create = function(template){
      template.__ = true; //for trnsitioning to template model
      template.deleteDirective = function(name){
        delete this[name];
      };
      template.isDirective = function(){
        for(var field in this){
          if(field.startsWith("@")) {return true;}
        }
        return false;
      };

    template.render = function(){
      delete this.isDirective;
      delete this.render;
      delete this.deleteDirective;
      delete this.__;
      return this;
    }

    return template
    };

module.exports = {
  create: function(template){
    return create(template);
  }
};