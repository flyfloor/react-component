"use strict";

var BEGIN_YEAR = 1900;
var BEGIN_MONTH = 1;
var BEGIN_DAY = 1;
var BEGIN_DATE = BEGIN_YEAR + "-" + BEGIN_MONTH + "-" + BEGIN_MONTH;

var date2Obj = function date2Obj(date) {
    var year = date.getFullYear() || BEGIN_YEAR;
    var month = date.getMonth() + 1 || BEGIN_MONTH;
    var day = date.getDate() || BEGIN_DAY;
    return { year: year, month: month, day: day };
};

var dateStr2Obj = function dateStr2Obj(dateStr) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { begin: null, end: null };

    var begin = options.begin || BEGIN_DATE,
        end = options.end;

    var date = dateStr ? new Date(dateStr) : new Date();

    begin = new Date(begin);
    if (end) end = new Date(end);

    var beginY = begin.getFullYear();
    var endY = void 0;
    if (end) endY = end.getFullYear();

    if (beginY && endY && beginY > endY) begin = end;
    if (begin.getFullYear() && date < begin) date = begin;
    if (endY && date > end) date = end;

    return date2Obj(date);
};

var date2DateStr = function date2DateStr() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    var _date2Obj = date2Obj(date),
        year = _date2Obj.year,
        month = _date2Obj.month,
        day = _date2Obj.day;

    return obj2DateStr(year, month, day);
};

var obj2DateStr = function obj2DateStr(year, month, day) {
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;
};

module.exports = {
    dateStr2Obj: dateStr2Obj, date2DateStr: date2DateStr, date2Obj: date2Obj, obj2DateStr: obj2DateStr
};