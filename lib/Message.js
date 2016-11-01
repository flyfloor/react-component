'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = _react2.default.createClass({
    displayName: 'Message',

    _timer: null,

    propTypes: {
        delay: _react2.default.PropTypes.number,
        content: _react2.default.PropTypes.element.isRequired,
        closeNode: _react2.default.PropTypes.element,
        onClose: _react2.default.PropTypes.func,
        position: _react2.default.PropTypes.oneOf(['top', 'center', 'bottom'])
    },
    getInitialState: function getInitialState() {
        return {
            display: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            delay: 5000,
            className: '',
            position: 'top',
            closeNode: _react2.default.createElement(
                'i',
                null,
                'x'
            )
        };
    },
    handleDisplay: function handleDisplay() {
        var _this = this;

        var display = this.state.display;
        var delay = this.props.delay;

        this.setState({
            display: !display
        });

        if (!display) {
            this._timer = setTimeout(function () {
                return _this.setState({ display: false });
            }, delay);
        } else {
            this.clearTimer();
        }
    },
    clearTimer: function clearTimer() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    },
    handleClose: function handleClose() {
        var onClose = this.props.onClose;

        onClose();
        this.clearTimer();
        this.setState({
            display: false
        });
    },
    render: function render() {
        var _props = this.props,
            children = _props.children,
            content = _props.content,
            className = _props.className,
            position = _props.position,
            closeNode = _props.closeNode,
            style = _props.style,
            onClose = _props.onClose;
        var display = this.state.display;

        className = (0, _className2.default)(className, '_' + position);
        if (display) {
            className += ' _active';
        }

        var msgNode = _react2.default.createElement(
            'div',
            { className: '_message' },
            content
        );
        if (onClose) {
            msgNode = _react2.default.createElement(
                'div',
                { className: '_message' },
                _react2.default.createElement(
                    'div',
                    { className: '_wrap' },
                    content
                ),
                _react2.default.createElement(
                    'div',
                    { className: '_close', onClick: this.handleClose },
                    closeNode
                )
            );
        }
        return _react2.default.createElement(
            'div',
            { className: 'ui message ' + className, style: style },
            _react2.default.createElement(
                'div',
                { className: '_trigger', onClick: this.handleDisplay },
                children
            ),
            msgNode
        );
    }
});

exports.default = Message;