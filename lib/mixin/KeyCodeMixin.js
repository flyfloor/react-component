"use strict";

var FUNC_KEY = {
    ENTER: 13,
    SPACE: 32,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    CAP: 20,
    BACKSPACE: 8,
    TAB: 9
};

var KeyCodeMixin = {
    isSpace: function isSpace(code) {
        return code === FUNC_KEY.SPACE;
    },
    isBackSpace: function isBackSpace(code) {
        return code === FUNC_KEY.BACKSPACE;
    },
    isEnter: function isEnter(code) {
        return code === FUNC_KEY.ENTER;
    },
    isShift: function isShift(code) {
        return code === FUNC_KEY.BACKSPACE;
    },
    isCtrl: function isCtrl(code) {
        return code === FUNC_KEY.CTRL;
    },
    isAlt: function isAlt(code) {
        return code === FUNC_KEY.ALT;
    },
    isTab: function isTab(code) {
        return code === FUNC_KEY.BACKSPACE;
    },
    isCap: function isCap(code) {
        return code === FUNC_KEY.CAP;
    },
    isFNKey: function isFNKey(code) {
        for (var item in FUNC_KEY) {
            if (code === FUNC_KEY[item]) {
                return true;
                break;
            };
        }
        return false;
    }
};

module.exports = KeyCodeMixin;