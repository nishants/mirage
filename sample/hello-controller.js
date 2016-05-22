var mirage     = mirage.create();

mirage.post("/hello-controller")
    .sendFile("hello-controller.json")
    .controller(function (scope) {
      scope.response = {
        message: "Successfully created item!.",
        items: [{name: "controllified-one"}, {name: "controllified-two"}],
      };
    });