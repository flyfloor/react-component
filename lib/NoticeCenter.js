'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
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

var NoticeCenter = function (_Component) {
    _inherits(NoticeCenter, _Component);

    function NoticeCenter(props) {
        _classCallCheck(this, NoticeCenter);

        var _this = _possibleConstructorReturn(this, (NoticeCenter.__proto__ || Object.getPrototypeOf(NoticeCenter)).call(this, props));

        _this.addNotice = _this.addNotice.bind(_this);
        _this.removeNotice = _this.removeNotice.bind(_this);

        _this.state = {
            notices: []
        };
        return _this;
    }

    _createClass(NoticeCenter, [{
        key: 'addNotice',
        value: function addNotice(notice) {
            notice.key = generateNoticeKey();
            this.setState(function (state) {
                return {
                    notices: state.notices.concat(notice)
                };
            });
        }
    }, {
        key: 'removeNotice',
        value: function removeNotice(key) {
            this.setState(function (state) {
                return {
                    notices: state.notices.filter(function (item) {
                        return item.key !== key;
                    })
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                            _this2.removeNotice(item.key, item);
                            if (typeof item.onClose === 'function') {
                                item.onClose(item);
                            }
                        } }));
                })
            );
        }
    }]);

    return NoticeCenter;
}(Component);

NoticeCenter.defaultProps = {
    prefix: DEFAULT_PREFIX,
    className: 'notice-center'
};

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
        key: prefix,
        addNotice: function addNotice(notice) {
            // close icon
            if (props.close) {
                notice.close = props.close;
            }
            notification.addNotice(notice);
        },
        removeNotice: function removeNotice(key) {
            notification.removeNotice(key);
        }
    };
};

module.exports = NoticeCenter;