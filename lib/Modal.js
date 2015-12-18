'use strict';

var React = require('react');

var Modal = React.createClass({
    displayName: 'Modal',

    propTypes: {
        title: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func
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
        var actionDOM = [],
            hasConfirm = this.props.onConfirm,
            hasCancel = this.props.onCancel;
        if (hasConfirm) actionDOM.push(React.createElement(
            'a',
            { href: 'javascript:;', key: 'confirm-action', onClick: this.handleConfirm },
            this.props.confirmText
        ));
        if (hasCancel) actionDOM.push(React.createElement(
            'a',
            { href: 'javascript:;', key: 'cancel-action', onClick: this.handleCancel },
            this.props.cancelText
        ));

        var footer = hasCancel || hasConfirm ? React.createElement(
            'div',
            { className: '_action' },
            React.createElement(
                'div',
                { className: '_wrap' },
                actionDOM
            )
        ) : null;

        var base = this.state.open ? React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: '_body' },
                React.createElement(
                    'div',
                    { className: '_title' },
                    this.props.title
                ),
                React.createElement(
                    'div',
                    { className: '_content' },
                    this.props.children,
                    footer
                ),
                React.createElement(
                    'div',
                    { className: '_close', onClick: this.closeModal },
                    'X'
                )
            ),
            React.createElement('div', { className: '_overlay', onClick: this.closeModal })
        ) : null;
        return React.createElement(
            'div',
            { className: 'ui modal', style: this.props.style },
            base
        );
    }
});

module.exports = Modal;