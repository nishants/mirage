var expect    = require('chai').expect,
    compiler  = require('../../src/jsong/compiler');

describe('Repeater', function() {
  it('should replace directory template with list', function () {
    var scope       = {},
        template = {
          "data" : {
            "@repeat" : "item in [{name: 'one'},{name: 'two'}, {name: 'three'}]",
            "id"      : "{{$index + 1}}",
            "name"    : "{{item.name}}"
          }
        },
        expected = {
          "data" : [
            {"id" : 1, "name": "one"},
            {"id" : 2, "name": "two"},
            {"id" : 3, "name": "three"}
          ]
        },
        result ;

    result = compiler.compile(scope, template);

    expect(result.data.length).to.equal(3);
    expect(result.data[0].id).to.equal(expected.data[0].id);
    expect(result.data[1].id).to.equal(expected.data[1].id);
    expect(result.data[2].id).to.equal(expected.data[2].id);
    expect(result.data[0].name).to.equal(expected.data[0].name);
    expect(result.data[1].name).to.equal(expected.data[1].name);
    expect(result.data[2].name).to.equal(expected.data[2].name);
  });
  it('should allow nested repeaters', function () {
    var scope       = {list : [["a1", "a2", "a3"],["b1", "b2", "b3"],["c1", "c2", "c3"]]},
        template = {
          "list" : {
            "@repeat" : "outer in list",
            "id" : "{{$index + 1}}",
            "value" :"{{outer}}"
          }
        },
        expected = {
          list : [
            {id: 1, value: ["a1", "a2", "a3"]},
            {id: 2, value: ["b1", "b2", "b3"]},
            {id: 3, value: ["c1", "c2", "c3"]}
          ]
        },
        result ;

    result = compiler.compile(scope, template);

    expect(result.list.length).to.equal(3);
    expect(result.list[0].id).to.equal(expected.list[0].id);
    expect(result.list[1].id).to.equal(expected.list[1].id);
    expect(result.list[2].id).to.equal(expected.list[2].id);

    expect(result.list[0].value).to.eql(["a1", "a2", "a3"]);
    expect(result.list[1].value).to.eql(["b1", "b2", "b3"]);
    expect(result.list[2].value).to.eql(["c1", "c2", "c3"]);
  });
});
