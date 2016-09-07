'use strict';

var klassName = function klassName() {
    if (arguments.length === 0) {
        return '';
    }
    var cls = Array.prototype.slice.call(arguments);
    return cls.filter(function (l) {
        return l;
    }).join(' ');
};

module.exports = klassName;