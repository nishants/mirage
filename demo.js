var mirage = require("./src/mirage").create();

mirage.post("/create").sendFile("../sample/create.json");
mirage.get("/get/:id").sendFile("../sample/request-path-param.json");
mirage.get("/params").sendFile("../sample/request-url-param.json");
mirage.get("/hello").sendFile("../sample/hello.json");
mirage.post("/repeater").sendFile("../sample/repeater-indline.json");

mirage.get("/check").sendFile("../sample/nested-repeater.json").controller(function(scope){
  scope.list = [["a1", "a2", "a3"],["b1", "b2", "b3"], ["c1", "c2", "c3"]];
});

mirage.app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});