'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTime = validateTime;

var _util = require('./util');

function validateTime(value) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
        spacer: ':',
        simple: false,
        maxHour: 23,
        miniHour: 0,
        maxMin: 59,
        miniMin: 0,
        maxSec: 59,
        miniSec: 0
    } : arguments[1];
    var spacer = options.spacer;
    var simple = options.simple;

    spacer = spacer || ':';
    value = value || '00' + spacer + '00' + spacer + '00';
    var arr = value.split(spacer);
    arr = arr.slice(0, 3);

    var _initMaxAndMiniByNum = (0, _util.initMaxAndMiniByNum)(options.maxHour, options.miniHour, 23);

    var maxHour = _initMaxAndMiniByNum.max;
    var miniHour = _initMaxAndMiniByNum.mini;

    var _initMaxAndMiniByNum2 = (0, _util.initMaxAndMiniByNum)(options.maxMin, options.miniMin, 59);

    var maxMin = _initMaxAndMiniByNum2.max;
    var miniMin = _initMaxAndMiniByNum2.mini;

    var _initMaxAndMiniByNum3 = (0, _util.initMaxAndMiniByNum)(options.maxSec, options.miniSec, 59);

    var maxSec = _initMaxAndMiniByNum3.max;
    var miniSec = _initMaxAndMiniByNum3.mini;

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

    if (hour > maxHour) hour = String(Math.floor(hour % (maxHour + 1)));
    if (isNaN(hour) || hour < miniHour) hour = String(miniHour);
    if (hour.length === 1) hour = '0' + hour;

    if (isNaN(min) || min < miniMin) min = String(miniMin);
    if (min > maxMin) min = String(Math.floor(min % 60));
    if (min.length === 1) min = '0' + min;

    if (sec > maxSec) sec = String(Math.floor(sec % 60));
    if (options.simple) {
        return {
            hour: hour,
            min: min
        };
    }
    if (isNaN(sec) || sec < miniSec) sec = String(miniSec);
    if (sec.length === 1) sec = '0' + sec;

    return {
        hour: hour,
        min: min,
        sec: sec
    };
}