'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Notice = require('./Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __key = 0;

var generateNoticeKey = function generateNoticeKey() {
    var str = 'notice_' + __key;
    __key += 1;
    return str;
};

var NoticeCenter = _react2.default.createClass({
    displayName: 'NoticeCenter',
    getInitialState: function getInitialState() {
        return {
            notices: []
        };
    },
    addNotice: function addNotice(notice) {
        notice.key = generateNoticeKey();
        this.setState(function (state) {
            return {
                notices: state.notices.concat(notice)
            };
        });
    },
    removeNotice: function removeNotice(key) {
        this.setState(function (state) {
            return {
                notices: state.notices.filter(function (item) {
                    return item.key !== key;
                })
            };
        });
    },
    render: function render() {
        var _this = this;

        var notices = this.state.notices;
        var className = this.props.className;

        className = (0, _className2.default)(className, 'notice-center');
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                { className: className, transitionName: 'notice',
                    transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                notices.map(function (item) {
                    return _react2.default.createElement(_Notice2.default, _extends({ key: item.key }, item, { onClose: function onClose() {
                            return _this.removeNotice(item.key);
                        } }));
                })
            )
        );
    }
});

exports.default = NoticeCenter;