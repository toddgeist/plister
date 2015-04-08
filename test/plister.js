/**
 * Created by toddgeist on 4/7/15.
 */


var should = require('chai').should()
var fs = require('fs');
var plistify = require('../index').plistify
var objectify = require('../index').objectify
var json = fs.readFileSync(__dirname + '/fixtures/data.json').toString();
var plist = fs.readFileSync(__dirname + '/fixtures/nestedList.txt').toString();


describe( 'plistify' , function(){
  it('should convert json to a plist' , function ( done ){
    var plist = plistify(json);
    plist.should.be.a('string');
    done()
  });

});


describe( 'objectify' , function(){
  it('should convert plist to a object' , function ( done ){
    var object = objectify(plist);
    object.should.be.an('object')
        .with.a.property('error');
    done()
  });

});

describe( 'both' , function(){
  it('should convert plist to a object and back to the same string' , function ( done ){
    var object = objectify(plist);
    var plist2 = plistify(object)
    plist2.should.equal(plist)
    done()
  });

  it('should convert object to a plist and back to the same object' , function ( done ){
    var plist = plistify(json);
    var backToObject = objectify(plist);
    var originalObject = JSON.parse(json);
    backToObject.response.error.should.equal(originalObject.response.error);
    done()
  });


});