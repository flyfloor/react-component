'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');

var Notice = React.createClass({
    displayName: 'Notice',

    propTypes: {
        delay: PropTypes.number,
        content: PropTypes.element,
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
            onClose: function onClose() {}
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        var _props = this.props;
        var delay = _props.delay;
        var onClose = _props.onClose;

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
    render: function render() {
        var _props2 = this.props;
        var title = _props2.title;
        var content = _props2.content;
        var closeIcon = _props2.closeIcon;
        var onClose = _props2.onClose;

        return React.createElement(
            'div',
            { className: 'ui notice' },
            title ? React.createElement(
                'div',
                { className: '_title' },
                title
            ) : null,
            React.createElement(
                'div',
                { className: '_content' },
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