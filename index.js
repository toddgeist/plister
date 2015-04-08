/**
 * Created by toddgeist on 4/7/15.
 */


var plistify = require('./src/jsonToNestedLists');
var objectify = require('./src/nestedListToJson')

module.exports = {
    objectify : objectify,
    plistify : plistify
};