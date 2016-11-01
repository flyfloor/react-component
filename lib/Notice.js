'use strict';

var React = require('react');
var klassName = require('./util/className');

var PropTypes = React.PropTypes;

var Notice = React.createClass({
    displayName: 'Notice',

    propTypes: {
        delay: PropTypes.number,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onClick: PropTypes.func,
        onClose: PropTypes.func.isRequired,
        closeIcon: PropTypes.element
    },

    getDefaultProps: function getDefaultProps() {
        return {
            content: null,
            delay: 5000,
            closeIcon: React.createElement(
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

        className = klassName(className, 'notice');
        return React.createElement(
            'div',
            { className: className },
            title ? React.createElement(
                'div',
                { className: '_title' },
                title
            ) : null,
            React.createElement(
                'div',
                { className: '_content', onClick: this.handleContentClick },
                content
            ),
            React.createElement(
                'div',
                { className: '_close', onClick: onClose },
                closeIcon
            )
        );
    }
});

module.exports = Notice;