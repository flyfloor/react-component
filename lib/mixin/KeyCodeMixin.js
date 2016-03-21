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

// const KeyCodeMixin = {

//     isSpace(code){
//         return code === FUNC_KEY.SPACE;
//     },

//     isBackSpace(code){
//         return code === FUNC_KEY.BACKSPACE;
//     },

//     isEnter(code){
//         return code === FUNC_KEY.ENTER;
//     },

//     isShift(code){
//         return code === FUNC_KEY.BACKSPACE;
//     },

//     isCtrl(code){
//         return code === FUNC_KEY.CTRL;
//     },

//     isAlt(code){
//         return code === FUNC_KEY.ALT;
//     },

//     isTab(code){
//         return code === FUNC_KEY.BACKSPACE;
//     },

//     isCap(code){
//         return code === FUNC_KEY.CAP;
//     },

//     isFNKey(code){
//         for(let item in FUNC_KEY){
//             if (code === FUNC_KEY[item])  return true;
//         }
//         return false;
//     }
// }

module.exports = KeyCodeMixin;