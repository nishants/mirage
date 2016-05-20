# Mirage

This is a framework for quickly stubbing a RESTful service and serving responses by incoming requests.

It has two main features:

1. Defining a webserver purely on basis of request/response json contracts.

2. Json templates.

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

## Using expressions in JSO-NG

Given a __hello.json__ is : 
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

Then making a __GET__ request to __'/user'__ results in : 
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
 and __request-path-param.json__ is : 
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

 and __request-url-param.json__ is : 
 ```javascript
{
  "body": {
    "search"  :"{{request.query.search}}",
    "page"   : "{{request.query.page}}",
    "size"   : "{{request.query.size}}"
  }
}
```
Then if a request is made to url __"/user?search=searchme&page=32&size=21"__; the above template renders to : 
 ```json
{
    "search": "searchme",
    "page": "32",
    "size": "21"
}
```

## Using request body in response : 

Given we declare following url :
```javascript
mirage.post("/user").sendFile("../sample/create.json");
```
and __create.json__ is : 
```json
 {
  "body": {
    "id"      :"1",
    "name"    : "{{request.body.name}}",
    "address" : {
      "street" : "{{request.body.address.street}}"
    }
  }
}
```
And we make a __POST__ request is made to url __"/user"__ with below body : 
```json
{
    "name": "Me",
    "address": {
      "street" : "MyPlace"
    }
}
```

Then we get following reponse : 
```json
{
    "id": "1",
    "name": "Me",
    "address": {
        "street": "MyPlace"
    }
}
```
