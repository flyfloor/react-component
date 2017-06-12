'use strict';

var NoticeCenter = require('./NoticeCenter');
var DEFAULT_PREFIX = 'flash-message';
var DEFAULT_CONTENT = 'this is a flash message';
var DEFAULT_DELAY = 5000;
var POSITIONS = ['top', 'center', 'bottom'];

var instance = null;

var generateNotice = function generateNotice(_ref) {
    var content = _ref.content,
        position = _ref.position,
        delay = _ref.delay,
        onClick = _ref.onClick,
        close = _ref.close;

    position = POSITIONS.indexOf(position) !== -1 ? position : POSITIONS[0];
    content = content || DEFAULT_CONTENT;
    delay = delay || DEFAULT_DELAY;
    instance = instance || NoticeCenter.init({
        className: DEFAULT_PREFIX,
        prefix: DEFAULT_PREFIX
    });
    return instance.addNotice({
        content: content,
        delay: delay,
        close: close,
        className: '_' + position,
        onClick: onClick
    });
};

var FlashMessage = function () {
    return {
        show: function show(msgObj) {
            return generateNotice(msgObj);
        }
    };
}();

module.exports = FlashMessage;