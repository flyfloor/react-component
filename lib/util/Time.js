'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateTime = validateTime;
function validateTime() {
    var value = arguments.length <= 0 || arguments[0] === undefined ? "00:00:00" : arguments[0];

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

    if (hour > 23) hour = String(Math.floor(hour % 24));
    if (isNaN(hour) || hour < 0) hour = "00";
    if (hour.length === 1) hour = '0' + hour;

    if (isNaN(min) || min < 0) min = "00";
    if (min > 59) min = String(Math.floor(min % 60));
    if (min.length === 1) min = '0' + min;

    if (sec > 59) sec = String(Math.floor(sec % 60));
    if (isNaN(sec) || sec < 0) sec = "00";
    if (sec.length === 1) sec = '0' + sec;

    return hour + ':' + min + ':' + sec;
}