'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var Notice = require('./Notice');
var DEFAULT_PREFIX = 'notice';

var __key = 0;

var generateNoticeKey = function generateNoticeKey() {
    var str = 'notice_' + __key;
    __key += 1;
    return str;
};

var NoticeCenter = React.createClass({
    displayName: 'NoticeCenter',
    getDefaultProps: function getDefaultProps() {
        return {
            prefix: DEFAULT_PREFIX,
            className: 'notice-center'
        };
    },
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
        var _props = this.props,
            className = _props.className,
            prefix = _props.prefix;

        return React.createElement(
            ReactCssTransitionGroup,
            { className: className, transitionName: prefix,
                transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
            notices.map(function (item) {
                return React.createElement(Notice, _extends({ key: item.key }, item, { onClose: function onClose() {
                        return _this.removeNotice(item.key, item);
                    } }));
            })
        );
    }
});

NoticeCenter.init = function (props) {
    props = props || {};
    var prefix = props.prefix || DEFAULT_PREFIX;
    var domId = 'dot_' + prefix + '_center';
    if (!document.getElementById(domId)) {
        var dom = document.createElement('div');
        dom.setAttribute('id', domId);
        document.body.appendChild(dom);
    }
    var notification = ReactDOM.render(React.createElement(NoticeCenter, props), document.getElementById(domId));
    return {
        addNotice: function addNotice(notice) {
            notification.addNotice(notice);
        },
        removeNotice: function removeNotice(key) {
            notification.removeNotice(key);
        }
    };
};

module.exports = NoticeCenter;