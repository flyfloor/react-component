'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notice = _react2.default.createClass({
    displayName: 'Notice',

    propTypes: {
        delay: _react.PropTypes.number,
        content: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
        onClick: _react.PropTypes.func,
        onClose: _react.PropTypes.func.isRequired,
        closeIcon: _react.PropTypes.element
    },

    getDefaultProps: function getDefaultProps() {
        return {
            content: null,
            delay: 5000,
            closeIcon: _react2.default.createElement(
                'i',
                null,
                'x'
            ),
            onClose: function onClose() {
                return;
            }
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        var _props = this.props,
            delay = _props.delay,
            onClose = _props.onClose;

        if (delay !== 0) {
            this._timer = setTimeout(function () {
                _this.clearTimer();
                onClose();
            }, delay);
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this.clearTimer();
    },
    clearTimer: function clearTimer() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    },
    handleContentClick: function handleContentClick() {
        var _props2 = this.props,
            onClick = _props2.onClick,
            onClose = _props2.onClose;

        if (onClick) {
            onClick(this.props);
            onClose();
        }
    },
    render: function render() {
        var _props3 = this.props,
            title = _props3.title,
            content = _props3.content,
            className = _props3.className,
            closeIcon = _props3.closeIcon,
            onClose = _props3.onClose;

        className = (0, _className2.default)(className, 'notice');
        return _react2.default.createElement(
            'div',
            { className: className },
            title ? _react2.default.createElement(
                'div',
                { className: '_title' },
                title
            ) : null,
            _react2.default.createElement(
                'div',
                { className: '_content', onClick: this.handleContentClick },
                content
            ),
            _react2.default.createElement(
                'div',
                { className: '_close', onClick: onClose },
                closeIcon
            )
        );
    }
});

exports.default = Notice;