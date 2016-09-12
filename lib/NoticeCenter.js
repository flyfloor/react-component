'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Notice = require('./Notice');
var klassName = require('./util/className');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

var __key = 0;

var generateNoticeKey = function generateNoticeKey() {
    var str = 'notice_' + __key;
    __key += 1;
    return str;
};

var NoticeCenter = React.createClass({
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

        className = klassName(className, 'notice-center');
        return React.createElement(
            'div',
            null,
            React.createElement(
                ReactCssTransitionGroup,
                { className: className, transitionName: 'notice',
                    transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                notices.map(function (item) {
                    return React.createElement(Notice, _extends({ key: item.key }, item, { onClose: function onClose() {
                            return _this.removeNotice(item.key);
                        } }));
                })
            )
        );
    }
});

module.exports = NoticeCenter;