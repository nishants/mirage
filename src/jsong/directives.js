var repeater = require("./directives/repeat"),
    all = {};

var inbuiltDirectives = function(){
  var repeater = require("./repeater");
  all[repeater.name] = {link: repeater.link};
 };

var Directives = {
  all: all,
  get: function (name) {
    return all[name];
  },
  add: function (name, definition) {
    all[name] = {link: definition.link};
  },
  link: function (scope, template, compile) {
    var directive,
        param;

    for (var field in template) {
      field.startsWith("@") && (directive = {
        name: field,
        directive: all[field]
      });
    }
    param = template[directive.name];
    delete template[directive.name];

    var replace = directive.directive.link(scope, template, param, compile);
    template = replace || compile(scope, template); // replace if directive returns valid value, else compile the template after directoryis done
    return template;
  }
};
Directives.add("@repeat", {link: repeater.link});
module.exports = Directives;
