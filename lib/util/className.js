'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var klassName = function klassName() {
    if (arguments.length === 0) {
        return '';
    }
    var cls = Array.prototype.slice.call(arguments);
    return cls.filter(function (l) {
        return l;
    }).join(' ');
};

exports.default = klassName;