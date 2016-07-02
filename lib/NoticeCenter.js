'use strict';

var React = require('react');
var Notice = require('./Notice');
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

        return React.createElement(
            'div',
            null,
            React.createElement(
                ReactCssTransitionGroup,
                { className: 'ui notice-center', transitionName: 'notice',
                    transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                notices.map(function (item) {
                    return React.createElement(Notice, { key: item.key, onClose: function onClose() {
                            return _this.removeNotice(item.key);
                        }, onClick: item.onClick,
                        content: item.content, delay: item.delay, title: item.title });
                })
            )
        );
    }
});

module.exports = NoticeCenter;