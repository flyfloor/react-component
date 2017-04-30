'use strict';

var isType = require('./typeCheck').isType;

var MAX_HOUR = 23;
var MAX_MINUTE = 59;
var MAX_SECOND = MAX_MINUTE;

// 时间字符串 => {小时，分钟，秒}
var timeStr2Obj = function timeStr2Obj() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00:00';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        simple: false
    };

    value = isType(value, 'String') ? value : '00:00:00';
    var arr = value.split(':').slice(0, 3);
    var new_arr = [];

    for (var i = 0; i < arr.length; i++) {
        var item = String(arr[i]);
        if (item.length === 1) item = '0' + item;
        if (!item) item = '00';
        new_arr.push(item);
    }

    var hour = new_arr[0],
        minute = new_arr[1],
        second = new_arr[2];

    hour = validateUnitByMax(hour, MAX_HOUR);
    minute = validateUnitByMax(minute, MAX_MINUTE);

    if (options.simple) return { hour: hour, minute: minute };

    second = validateUnitByMax(second, MAX_SECOND);

    return { hour: hour, minute: minute, second: second };
};

// {小时, 分钟, 秒} => 时间字符串
var obj2TimeStr = function obj2TimeStr(_ref) {
    var _ref$hour = _ref.hour,
        hour = _ref$hour === undefined ? 0 : _ref$hour,
        _ref$minute = _ref.minute,
        minute = _ref$minute === undefined ? 0 : _ref$minute,
        _ref$second = _ref.second,
        second = _ref$second === undefined ? 0 : _ref$second;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        simple: false
    };

    hour = validateUnitByMax(hour, MAX_HOUR);
    minute = validateUnitByMax(minute, MAX_MINUTE);

    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }

    if (options.simple) {
        return hour + ':' + minute;
    }
    second = validateUnitByMax(second, MAX_SECOND);

    if (second < 10) {
        second = '0' + second;
    }

    return hour + ':' + minute + ':' + second;
};

var seconds2Obj = function seconds2Obj(value) {
    value = value || 0;
    value = value % 86400;
    var hour = parseInt(value / 3600);
    var minute = parseInt(value % 3600 / 60);
    var second = value % 3600 % 60;
    return {
        hour: hour, minute: minute, second: second
    };
};

var obj2Seconds = function obj2Seconds(_ref2) {
    var hour = _ref2.hour,
        minute = _ref2.minute,
        second = _ref2.second;

    hour = hour || 0;
    minute = minute || 0;
    second = second || 0;
    return hour * 3600 + minute * 60 + second;
};

var validateUnitByMax = function validateUnitByMax(value, max) {
    value = parseInt(value);
    if (value > max) value = Math.floor(value % (max + 1));
    if (isNaN(value) || value < 0) value = 0;
    return value;
};

module.exports = {
    timeStr2Obj: timeStr2Obj,
    obj2TimeStr: obj2TimeStr,
    seconds2Obj: seconds2Obj,
    obj2Seconds: obj2Seconds
};