'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var MAX_HOUR = 23;
var MAX_MIN = 59;
var MAX_SEC = MAX_MIN;

var timeStr2Obj = function timeStr2Obj() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? '00:00:00' : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
        simple: false
    } : arguments[1];
    var simple = options.simple;


    var arr = value.split(':');
    arr = arr.slice(0, 3);

    for (var i = 0; i < arr.length; i++) {
        var item = String(arr[i]);
        if (item.length > 2) arr[i] = item.slice(0, 2);
        if (item.length === 1) arr[i] = '0' + item;
        if (!item) arr[i] = '00';
    };

    var _arr = arr;

    var _arr2 = _slicedToArray(_arr, 3);

    var hour = _arr2[0];
    var min = _arr2[1];
    var sec = _arr2[2];

    hour = validateUnitByMax(hour, MAX_HOUR);
    min = validateUnitByMax(min, MAX_MIN);

    if (options.simple) return { hour: hour, min: min };

    sec = validateUnitByMax(sec, MAX_SEC);

    return { hour: hour, min: min, sec: sec };
};

var validateUnitByMax = function validateUnitByMax(value, max) {
    if (value > max) value = String(Math.floor(value % (max + 1)));
    if (isNaN(value) || value < 0) value = '00';
    if (value.length === 1) value = '0' + value;
    return value;
};

module.exports = { timeStr2Obj: timeStr2Obj };