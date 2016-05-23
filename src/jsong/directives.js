var repeater = require("./directives/repeat"),
    scopes = require("./scope"),
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
    var directives = [];
    scope.$scope || (scope = scopes.create(scope));
    for (var field in template) {
      field.startsWith("@") && directives.push({
        name: field,
        directive: all[field]
      });
    }
    for (var i = 0; i < directives.length; i++) {
      var params = template[directives[i].name],
          directive = directives[i];

      delete template[directives[i].name];
      var replace = directives[i].directive.link(scope, template, params, compile);
      template = replace || compile(scope, template); // replace if directive returns valid value, else compile the template after directoryis done
    }
    return template;
  },
};
Directives.add("@repeat", {link: repeater.link});
module.exports = Directives;
