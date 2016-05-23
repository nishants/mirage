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
});
