"use strict";

var _timer = null;

module.exports = function (fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    clearTimeout(_timer);
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _timer = setTimeout(function () {
            fn.apply(undefined, args);
        }, delay);
    };
};