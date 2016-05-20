# Mirage

This is a framework for quickly setting up a RESTful service for serving json responses in context of incoming requests.

It has two main features:

1. Defining a webserver purely on basis of request/response contract.

2. Using json templates just like our forefathers did with html (in the days of      server side html rendering).

## JSO-NG

  JSO-NG is a templating language for serving json content.
  It is inspired by the notion of html templates (mocha, angular).
  It extends the notion of compiling html templates (driven by in memory objects) to json.

## So what can you do with this ?

You can use this to quickly setup a web-server that can stub a RESTful json based remote server.

## A sample script :

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

## Using expressions in JSO-NG

Given a hello.json is : 
 ```javascript
{
  "body": {
    "message": "hello",
    "id": "{{0 + 1 }}"
  }
}
```
And following url mapping is declared 
 ```javascript
 mirage.post("/user").sendFile("../sample/hello.json")
```

Then making a GET request to '/user' results in : 
 ```json
 {
    "message": "hello",
    "id": "1"
}
 ```
## Using request path parameters
Given we declare following url :
 ```javascript
 mirage.get("/user/:id").sendFile("../sample/request-path-param.json");
```
 and request-path-param.json is : 
 ```javascript
{
  "body": {
    "id"      :"{{request.path.id}}",
    "name"    : "someone"
  }
}
```
Then if a request is made to url "user/101", above template renders to : 
 ```json
 {
    "id": "101",
    "name": "someone"
}
```
## Using request url params in response : 
Given we declare following url :

 ```javascript
mirage.get("/user").sendFile("../sample/request-url-param.json");
```

 and request-url-param.json is : 
 ```javascript
{
  "body": {
    "search"  :"{{request.query.search}}",
    "page"   : "{{request.query.page}}",
    "size"   : "{{request.query.size}}"
  }
}
```
Then if a request is made to url "/user?search=searchme&page=32&size=21", above template renders to : 
 ```json
{
    "search": "searchme",
    "page": "32",
    "size": "21"
}
```
