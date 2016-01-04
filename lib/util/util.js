"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initMaxAndMiniByNum = initMaxAndMiniByNum;
function initMaxAndMiniByNum(max, mini, num) {
    max = max || num;
    mini = mini || 0;
    max = max > num ? num : parseInt(max);
    mini = mini > max ? max : parseInt(mini);
    return { max: max, mini: mini };
}