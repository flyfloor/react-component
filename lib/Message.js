'use strict';

var React = require('react');

var Message = React.createClass({
    displayName: 'Message',

    delayJob: null,

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
        var _props = this.props;
        var delay = _props.delay;
        var onClose = _props.onClose;

        this.setState({
            display: !display
        });

        if (!display) {
            this.delayJob = setTimeout(function () {
                return _this.setState({ display: false });
            }, delay);
        } else {
            clearTimeout(this.delayJob);
        }
    },
    handleClose: function handleClose() {
        var onClose = this.props.onClose;

        onClose();
        clearTimeout(this.delayJob);
        this.setState({
            display: false
        });
    },
    render: function render() {
        var _props2 = this.props;
        var children = _props2.children;
        var content = _props2.content;
        var className = _props2.className;
        var position = _props2.position;
        var closeNode = _props2.closeNode;
        var style = _props2.style;
        var onClose = _props2.onClose;
        var display = this.state.display;

        className += ' _' + position;
        if (display) className += ' _active';
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