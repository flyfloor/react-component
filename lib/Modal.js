'use strict';

var React = require('react');
var klassName = require('./util/className');

var PropTypes = React.PropTypes;
var Modal = React.createClass({
    displayName: 'Modal',

    propTypes: {
        title: PropTypes.element,
        confirm: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        cancel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        onClose: PropTypes.func,
        close: PropTypes.element
    },

    getInitialState: function getInitialState() {
        return {
            display: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            confirm: 'confirm',
            cancel: 'cancel',
            close: React.createElement(
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
        var _props = this.props,
            onConfirm = _props.onConfirm,
            onCancel = _props.onCancel,
            confirm = _props.confirm,
            className = _props.className,
            cancel = _props.cancel,
            title = _props.title,
            children = _props.children,
            style = _props.style,
            force = _props.force,
            close = _props.close;
        var display = this.state.display;

        var actionDOM = [];
        if (onConfirm) actionDOM.push(React.createElement(
            'div',
            { key: '_confirm-action', className: '_action-btn',
                onClick: this.handleConfirm },
            confirm
        ));
        if (onCancel) actionDOM.push(React.createElement(
            'div',
            { key: '_cancel-action', className: '_action-btn',
                onClick: this.handleCancel },
            cancel
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
                        close
                    )
                )
            ),
            force ? React.createElement('div', { className: '_overlay' }) : React.createElement('div', { className: '_overlay', onClick: this.close })
        );
    }
});

module.exports = Modal;