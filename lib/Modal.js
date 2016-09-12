'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var klassName = require('./util/className');

var Modal = React.createClass({
    displayName: 'Modal',

    propTypes: {
        title: PropTypes.element,
        confirmText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        cancelText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        onClose: PropTypes.func,
        closeIcon: PropTypes.element
    },

    getInitialState: function getInitialState() {
        return {
            display: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            confirmText: 'confirm',
            cancelText: 'cancel',
            closeIcon: React.createElement(
                'span',
                null,
                'x'
            )
        };
    },
    open: function open() {
        this.setState({
            display: true
        });
    },
    close: function close() {
        var onClose = this.props.onClose;

        if (onClose && !onClose()) return;
        this.setState({
            display: false
        });
    },
    handleConfirm: function handleConfirm() {
        if (this.props.onConfirm()) this.close();
    },
    handleCancel: function handleCancel() {
        if (this.props.onCancel()) this.close();
    },
    render: function render() {
        var _props = this.props;
        var onConfirm = _props.onConfirm;
        var onCancel = _props.onCancel;
        var confirmText = _props.confirmText;
        var className = _props.className;
        var cancelText = _props.cancelText;
        var title = _props.title;
        var children = _props.children;
        var style = _props.style;
        var force = _props.force;
        var closeIcon = _props.closeIcon;
        var display = this.state.display;

        var actionDOM = [];
        if (onConfirm) actionDOM.push(React.createElement(
            'div',
            { key: '_confirm-action', className: '_action-btn',
                onClick: this.handleConfirm },
            confirmText
        ));
        if (onCancel) actionDOM.push(React.createElement(
            'div',
            { key: '_cancel-action', className: '_action-btn',
                onClick: this.handleCancel },
            cancelText
        ));

        var footer = onCancel || onConfirm ? React.createElement(
            'div',
            { className: '_actions' },
            actionDOM
        ) : null;

        className = klassName('modal', className);

        if (display) {
            className += ' _show';
        }
        if (force) {
            className += ' _force';
        }

        return React.createElement(
            'div',
            { style: style, className: className },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: '_body' },
                    React.createElement(
                        'div',
                        { className: '_wrap' },
                        title ? React.createElement(
                            'div',
                            { className: '_title' },
                            title
                        ) : null,
                        React.createElement(
                            'div',
                            { className: '_content' },
                            children,
                            footer
                        ),
                        force ? null : React.createElement(
                            'div',
                            { className: '_close', onClick: this.close },
                            closeIcon
                        )
                    )
                ),
                force ? React.createElement('div', { className: '_overlay' }) : React.createElement('div', { className: '_overlay', onClick: this.close })
            )
        );
    }
});

module.exports = Modal;