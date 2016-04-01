"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleClass = toggleClass;
exports.removeClass = removeClass;
exports.hasClass = hasClass;
exports.addClass = addClass;
function toggleClass(el, className) {
    if (el && el instanceof Node && className) {
        var str = String(el.className);
        var index = str.indexOf(className);
        if (index === -1) {
            str = str + " " + className;
        } else {
            str = str.slice(0, index) + str.slice(index, className.length);
        }
        el.className = str;
    }
}

function removeClass(el, className) {
    if (!el || !className) return;
    if (el instanceof NodeList) {
        var length = el.length;
        for (var i = 0; i < length; i++) {
            el[i].className = removeSubStr(el[i].className, className);
        }
        return;
    }
    if (el instanceof Node && hasClass(el, className)) {
        el.className = removeSubStr(el.className, className);
    }
}

function hasClass(el, className) {
    if (el && className && el instanceof Node) {
        var str = el.className;
        return str.indexOf(className) !== -1;
    }
    return false;
}

function addClass(el, className) {
    if (!el || !className) return;
    if (el instanceof NodeList) {
        var length = el.length;
        for (var i = 0; i < length; i++) {
            if (!hasClass(el[i], className)) el[i].className = el[i].className + " " + className;
        }
        return;
    }
    if (el instanceof Node && !hasClass(el, className)) el.className = el.className + " " + className;
}

function removeSubStr(str, subStr) {
    var index = str.indexOf(subStr);
    if (index !== -1) return str.slice(0, index) + str.slice(index, subStr.length);
    return str;
}