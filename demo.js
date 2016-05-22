var mirage = require("./src/mirage").create();

mirage.post("/create").sendFile("../sample/create.json");
mirage.get("/get/:id").sendFile("../sample/request-path-param.json");
mirage.get("/params").sendFile("../sample/request-url-param.json");
mirage.get("/hello").sendFile("../sample/hello.json");
mirage.post("/repeater").sendFile("../sample/repeater-inline.json");

mirage.app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});