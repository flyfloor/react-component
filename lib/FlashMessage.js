'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var klassName = require('./util/className');

var FlashMessage = React.createClass({
    displayName: 'FlashMessage',

    _timer: null,

    propTypes: {
        delay: PropTypes.number,
        close: PropTypes.element,
        onClose: PropTypes.func,
        position: PropTypes.oneOf(['top', 'center', 'bottom'])
    },
    getInitialState: function getInitialState() {
        return {
            open: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            delay: 5000,
            className: '',
            position: 'top',
            close: React.createElement(
                'i',
                null,
                'x'
            )
        };
    },
    open: function open() {
        var _this = this;

        var open = this.state.open;
        var delay = this.props.delay;

        this.setState({
            open: !open
        });

        if (!open) {
            this._timer = setTimeout(function () {
                return _this.setState({ open: false });
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
            open: false
        });
    },
    render: function render() {
        var _props = this.props,
            children = _props.children,
            className = _props.className,
            position = _props.position,
            close = _props.close,
            style = _props.style,
            onClose = _props.onClose;
        var open = this.state.open;

        className = klassName(className, '_' + position);

        if (open) {
            className += ' _active';
        }

        var msgNode = React.createElement(
            'div',
            { className: '_content' },
            children
        );
        if (onClose) {
            msgNode = React.createElement(
                'div',
                { className: '_content' },
                React.createElement(
                    'div',
                    { className: '_wrap' },
                    children
                ),
                React.createElement(
                    'div',
                    { className: '_close', onClick: this.handleClose },
                    close
                )
            );
        }
        return React.createElement(
            'div',
            { className: 'flash-message ' + className, style: style },
            msgNode
        );
    }
});

module.exports = FlashMessage;