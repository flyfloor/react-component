'use strict';

var isType = require('./typeCheck').isType;

var MAX_HOUR = 23;
var MAX_MIN = 59;
var MAX_SEC = MAX_MIN;

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
        if (item.length > 2) item = item.slice(0, 2);
        if (item.length === 1) item = '0' + item;
        if (!item) item = '00';
        new_arr.push(item);
    }

    var hour = new_arr[0],
        min = new_arr[1],
        sec = new_arr[2];

    hour = validateUnitByMax(hour, MAX_HOUR);
    min = validateUnitByMax(min, MAX_MIN);

    if (options.simple) return { hour: hour, min: min };

    sec = validateUnitByMax(sec, MAX_SEC);

    return { hour: hour, min: min, sec: sec };
};

var validateUnitByMax = function validateUnitByMax(value, max) {
    value = String(parseInt(value));
    if (value > max) value = String(Math.floor(value % (max + 1)));
    if (isNaN(value) || value < 0) value = '00';
    if (value.length === 1) value = '0' + value;
    return value;
};

module.exports = {
    timeStr2Obj: timeStr2Obj
};