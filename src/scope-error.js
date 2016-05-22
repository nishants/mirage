module.exports = {
    create: function(params){
      var message = "Invalid Expression : <expression>, in scope : <scope>, error: <error>"
                      .replace("<expression>", params.expression)
                      .replace("<scope>", JSON.stringify(params.scope))
                      .replace("<error>", params.error);
      return {
        message: message
      };
    }
}