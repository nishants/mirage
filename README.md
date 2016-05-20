# MiRagE

This is a framework for quickly setting up a RESTful service for serving json responses in context of incoming requests.

 It has two main features:
   1. Defining a webserver purely on basis of request/response contract.
   2. Using json templates just like our forefathers did with html (in the days of server side html rendering).

 ### JSO-NG
   JSO-NG is a templating language for serving json content.
   It is inspired by the notion of html templates (mocha, angular).
   It extends the notion of compiling html templates (driven by in memory objects) to json.

 So what can you do with this ?
 You can use this to quickly setup a web-server that can stub a RESTful json based remote server.

 ### A sample script :

 ```javascript
 var mirage     = require("./mirage").create();
 mirage.post("/user").sendFile("../sample/create.json");
 mirage.get("/user/:id").sendFile("../sample/request-path-param.json");
 mirage.get("/user").sendFile("../sample/request-url-param.json");

 mirage.app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
 });
```
You can find the sample json templates in sample/ directory.

##### Using expressions in JSO-NG
You can exectute a JS snippet before serving a json, and do it conviniently in your json.
 ```javascript
{
  "body": {
    "message": "hello",
    "id": "{{0 + 1 }}"
  }
}
```

###### Above renders to following json : 
 ```json
 {
    "message": "hello",
    "id": "1"
}
 ```
##### Using request path parameters
 ```javascript
{
  "body": {
    "id"      :"{{request.path.id}}",
    "name"    : "someone"
  }
}
```
If the request is made to url "user/", above template renders to : 
 ```json
 {
    "id": "212",
    "name": "someone"
}
```
