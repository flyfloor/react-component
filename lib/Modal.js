'use strict';

var React = require('react');

var Modal = React.createClass({
    displayName: 'Modal',

    propTypes: {
        title: React.PropTypes.element,
        confirmText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onClose: React.PropTypes.func.isRequired,
        display: React.PropTypes.bool,
        closeIcon: React.PropTypes.element
    },

    getInitialState: function getInitialState() {
        return {
            open: this.props.display
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            display: false,
            confirmText: 'confirm',
            cancelText: 'cancel',
            closeIcon: React.createElement(
                'span',
                null,
                'x'
            )
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
        var closeIcon = _props.closeIcon;
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
            actionDOM
        ) : null;

        var className = ['ui', 'modal'];
        if (open) className.push('_show');
        if (force) className.push('_force');
        className = className.join(' ');

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
                            { className: '_close', onClick: this.closeModal },
                            closeIcon
                        )
                    )
                ),
                force ? React.createElement('div', { className: '_overlay' }) : React.createElement('div', { className: '_overlay', onClick: this.closeModal })
            )
        );
    }
});

module.exports = Modal;