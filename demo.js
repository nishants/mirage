var mirage = require("./src/mirage").create();

mirage.post("/user").sendFile("../sample/create.json");
mirage.get("/user/:id").sendFile("../sample/request-path-param.json");
mirage.get("/user").sendFile("../sample/request-url-param.json");
mirage.get("/hello").sendFile("../sample/hello.json");

mirage.app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});