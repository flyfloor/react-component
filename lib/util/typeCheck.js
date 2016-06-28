"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isType = isType;
function isType(obj, typeStr) {
    return Object.prototype.toString.call(obj).slice(8, -1) === typeStr;
}