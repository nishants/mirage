var mirage     = require("./mirage").create();
mirage.post("/user").sendFile("../sample/create.json");
mirage.get("/user").sendFile("../sample/hello.json");

mirage.app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});