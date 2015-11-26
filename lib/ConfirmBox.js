'use strict';

var React = require('react');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var PopUpMixin = require('./mixin/PopUpMixin');

var ConfirmBox = React.createClass({
    displayName: 'ConfirmBox',

    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func
    },

    closeConfirm: function closeConfirm() {
        this.setState({
            open: false
        });
    },
    onOtherDomClick: function onOtherDomClick(e) {
        this.closeConfirm();
    },
    handleCancel: function handleCancel() {
        if (!this.props.onCancel) return this.closeConfirm();
        if (this.props.onCancel()) this.closeConfirm();
    },
    handleConfirm: function handleConfirm() {
        if (!this.props.onConfirm) return this.closeConfirm();
        if (this.props.onConfirm()) this.closeConfirm();
    },
    render: function render() {
        var content = this.state.open ? React.createElement(
            'div',
            { className: '_wrap _' + this.props.position },
            React.createElement('span', { className: '_arrow', ref: 'arrow' }),
            React.createElement(
                'div',
                { ref: 'content', className: '_content' },
                React.createElement(
                    'div',
                    { className: '_title' },
                    this.props.title
                ),
                React.createElement(
                    'div',
                    { className: '_action' },
                    React.createElement(
                        'a',
                        { href: 'javascript:;', className: '_confirm', onClick: this.handleConfirm },
                        '确认'
                    ),
                    React.createElement(
                        'a',
                        { href: 'javascript:;', className: '_cancel', onClick: this.handleCancel },
                        '取消'
                    )
                )
            )
        ) : null;
        return React.createElement(
            'span',
            { className: 'ui confirm-box popup', style: this.props.style, onClick: this.onTrigger },
            React.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                this.props.children
            ),
            content
        );
    }
});

module.exports = ConfirmBox;