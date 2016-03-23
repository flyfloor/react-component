'use strict';

var React = require('react');

var Modal = React.createClass({
    displayName: 'Modal',

    propTypes: {
        title: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        display: React.PropTypes.bool
    },

    getInitialState: function getInitialState() {
        return {
            open: this.props.display
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            display: false,
            title: 'modal title',
            confirmText: 'confirm',
            cancelText: 'cancel'
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.display
        });
    },
    handleConfirm: function handleConfirm() {
        if (this.props.onConfirm()) this.closeModal();
    },
    handleCancel: function handleCancel() {
        if (this.props.onCancel()) this.closeModal();
    },
    closeModal: function closeModal() {
        this.props.onClose();
        this.setState({
            open: false
        });
    },
    render: function render() {
        var _props = this.props;
        var onConfirm = _props.onConfirm;
        var onCancel = _props.onCancel;
        var confirmText = _props.confirmText;
        var cancelText = _props.cancelText;
        var title = _props.title;
        var children = _props.children;
        var style = _props.style;
        var force = _props.force;
        var open = this.state.open;

        var actionDOM = [];
        if (onConfirm) actionDOM.push(React.createElement(
            'a',
            { href: 'javascript:;', key: 'confirm-action',
                onClick: this.handleConfirm },
            confirmText
        ));
        if (onCancel) actionDOM.push(React.createElement(
            'a',
            { href: 'javascript:;', key: 'cancel-action',
                onClick: this.handleCancel },
            cancelText
        ));

        var footer = onCancel || onConfirm ? React.createElement(
            'div',
            { className: '_action' },
            React.createElement(
                'div',
                { className: '_wrap' },
                actionDOM
            )
        ) : null;

        var node = open ? React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: '_body' },
                React.createElement(
                    'div',
                    { className: '_title' },
                    title
                ),
                React.createElement(
                    'div',
                    { className: '_content' },
                    children,
                    footer
                ),
                force ? null : React.createElement(
                    'div',
                    { className: '_close', onClick: this.closeModal },
                    'x'
                )
            ),
            force ? React.createElement('div', { className: '_overlay' }) : React.createElement('div', { className: '_overlay', onClick: this.closeModal })
        ) : null;

        return React.createElement(
            'div',
            { className: 'ui modal', style: style },
            node
        );
    }
});

module.exports = Modal;