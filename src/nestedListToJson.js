/**
 * Created by toddgeist on 4/7/15.
 */
var fs = require('fs');
var S = require('string')

module.exports = handleNestedList


function handleNestedList(nestedList){

    // first we try to split
    var array = nestedList.split('\r');

    if(array.length > 0){
        var obj = {}
        array.forEach(function(pair){
            if (pair != ''){
                handleSingle(obj, pair)
            }
        });
        return obj
    }
    return nestedList
}

function handleArray(array){
    array = array.split('\r');
    var newArray = [];

    array.forEach(function(pair){
        if (pair != ''){
            pair = fmUnQuote(pair)
            var obj = handleNestedList(pair);
            newArray.push(obj)
        }
    });
    return newArray
}


function handleSingle(obj, pair){

    pair = pair.split('=');




    var name = pair.shift();
    var value = pair.join("=");


    value = fmUnQuote(value);

    if(S(name).startsWith("#")){
        value = handleArray(value)
        name = name.substring(1, name.length)
    }else  if (S(value).contains('\r')){
        value = handleNestedList(value)
    }

    obj[name] = value;
    return obj

}

function fmUnQuote(string){
    var s = string
    if (typeof string == 'string' || string instanceof String){

        s = S(s).replaceAll('\\¶', '*|*').s;
        s = S(s).replaceAll('¶', '\r' ).s;
        s = S(s).replaceAll('*|*', '¶').s;

    }
    return s

}

function isNestedListArray(s){
    if(! S(s).contains('¶') ) return false

    s = S(s).replaceAll('\\¶', '*|*').s;
    return ( S(s).contains('¶') )
}