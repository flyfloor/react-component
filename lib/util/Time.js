'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTime = validateTime;
exports.initMaxAndMiniByNum = initMaxAndMiniByNum;
function validateTime() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? "00:00:00" : arguments[0];
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
    var arr = value.split(spacer);
    arr = arr.slice(0, 3);

    var _initMaxAndMiniByNum = initMaxAndMiniByNum(options.maxHour, options.miniHour, 23);

    var maxHour = _initMaxAndMiniByNum.max;
    var miniHour = _initMaxAndMiniByNum.mini;

    var _initMaxAndMiniByNum2 = initMaxAndMiniByNum(options.maxMin, options.miniMin, 59);

    var maxMin = _initMaxAndMiniByNum2.max;
    var miniMin = _initMaxAndMiniByNum2.mini;

    var _initMaxAndMiniByNum3 = initMaxAndMiniByNum(options.maxSec, options.miniSec, 59);

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
    if (isNaN(hour) || hour < miniHour) hour = "00";
    if (hour.length === 1) hour = '0' + hour;

    if (isNaN(min) || min < miniMin) min = "00";
    if (min > maxMin) min = String(Math.floor(min % 60));
    if (min.length === 1) min = '0' + min;

    if (sec > maxSec) sec = String(Math.floor(sec % 60));
    if (options.simple) return hour + ':' + min;
    if (isNaN(sec) || sec < miniSec) sec = "00";
    if (sec.length === 1) sec = '0' + sec;

    return hour + ':' + min + ':' + sec;
}

function initMaxAndMiniByNum(max, mini, num) {
    max = max || num;
    mini = mini || 0;
    max = max > num ? num : parseInt(max);
    mini = mini > max ? max : parseInt(mini);
    return { max: max, mini: mini };
}