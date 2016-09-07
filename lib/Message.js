'use strict';

var React = require('react');
var klassName = require('./util/className');

var Message = React.createClass({
    displayName: 'Message',

    _timer: null,

    propTypes: {
        delay: React.PropTypes.number,
        content: React.PropTypes.element.isRequired,
        closeNode: React.PropTypes.element,
        onClose: React.PropTypes.func,
        position: React.PropTypes.oneOf(['top', 'center', 'bottom'])
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
            closeNode: React.createElement(
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
        var _props = this.props;
        var children = _props.children;
        var content = _props.content;
        var className = _props.className;
        var position = _props.position;
        var closeNode = _props.closeNode;
        var style = _props.style;
        var onClose = _props.onClose;
        var display = this.state.display;

        className = klassName(className, '_' + position);
        if (display) {
            className += ' _active';
        }

        var msgNode = React.createElement(
            'div',
            { className: '_message' },
            content
        );
        if (onClose) {
            msgNode = React.createElement(
                'div',
                { className: '_message' },
                React.createElement(
                    'div',
                    { className: '_wrap' },
                    content
                ),
                React.createElement(
                    'div',
                    { className: '_close', onClick: this.handleClose },
                    closeNode
                )
            );
        }
        return React.createElement(
            'div',
            { className: 'ui message ' + className, style: style },
            React.createElement(
                'div',
                { className: '_trigger', onClick: this.handleDisplay },
                children
            ),
            msgNode
        );
    }
});

module.exports = Message;