var mirage  = require("./mirage");
var app     = mirage.start();
mirage.post("/user").sendFile("../sample/create.json");
mirage.get("/user").sendFile("../sample/hello.json");

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});