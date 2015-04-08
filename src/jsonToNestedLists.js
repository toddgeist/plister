/**
 * Created by toddgeist on 4/7/15.
 */


var fs = require('fs');
var S = require('string')

module.exports = start


function start(data){
    if (isString(data)){
        data = JSON.parse(data)
    }
    return parser(data)

}

function parser(data){

    var d = '';
    if(Array.isArray(data)){
        d = handleArray(data)
    }else if(isObject(data)){
        d = handleObject(data)
    }else{
        d = data
    }
    return d
}

function handleArray(data){
    var d = '';
    data.forEach(function (item) {
        var s = parser(item)
        d = d + fmQuote(s) + "\r"
    })
    return d

}

function handleObject(obj){
    var keys  =  Object.keys(obj);
    var d = ''
    keys.forEach(function (key) {
        var o = obj[key];
        o = parser(o);

        d = d + key + "=" + fmQuote(o) + "\r" ;
    })
    return d

}

function fmQuote(string){
    var s = string
    if (typeof string == 'string' || string instanceof String){

        s = S(s).replaceAll('¶', '\\¶').s
        s = S(s).replaceAll('\r', '¶').s

    }
    return s

}

function isObject(obj) {
    return obj === Object(obj);
}

function isString(string){
   return typeof string == 'string' || string instanceof String
}