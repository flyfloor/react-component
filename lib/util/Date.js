'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateDate = validateDate;
exports.trimDate = trimDate;
exports.formatDate = formatDate;

var _util = require('./util');

function validateDate(dateStr) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {
        begin: null,
        end: null
    } : arguments[1];

    var begin = options.begin,
        end = options.end;

    var date = dateStr ? new Date(dateStr) : new Date();

    begin = new Date(begin);
    end = end ? new Date(end) : new Date();

    var beginY = begin.getFullYear();
    var endY = begin.getFullYear();
    if (beginY && endY && beginY > endY) begin = end;
    if (begin.getFullYear() && date < begin) date = begin;
    if (endY && date > end) date = end;

    return drawDate(date);
}

function trimDate() {
    var date = arguments.length <= 0 || arguments[0] === undefined ? new Date() : arguments[0];

    var _drawDate = drawDate(date);

    var year = _drawDate.year;
    var month = _drawDate.month;
    var day = _drawDate.day;

    return formatDate(year, month, day);
}

function drawDate(date) {
    var year = date.getFullYear() || '1970';
    var month = date.getMonth() + 1 || '01';
    var day = date.getDate() || '01';
    return { year: year, month: month, day: day };
}

function formatDate(year, month, day) {
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
}