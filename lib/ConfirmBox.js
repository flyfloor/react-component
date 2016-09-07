'use strict';

var React = require('react');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var PopUpMixin = require('./mixin/PopUpMixin');
var klassName = require('./util/className');

var ConfirmBox = React.createClass({
    displayName: 'ConfirmBox',

    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
        force: React.PropTypes.bool,
        content: React.PropTypes.element.isRequired,
        confirmBtn: React.PropTypes.element,
        cancelBtn: React.PropTypes.element
    },

    closeConfirm: function closeConfirm() {
        this.setState({
            open: false
        });
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    onOtherDomClick: function onOtherDomClick() {
        if (!this.props.force) this.closeConfirm();
    },
    handleCancel: function handleCancel() {
        var onCancel = this.props.onCancel;

        if (!onCancel) return this.closeConfirm();
        if (onCancel()) this.closeConfirm();
    },
    handleConfirm: function handleConfirm() {
        var onConfirm = this.props.onConfirm;

        if (!onConfirm) return this.closeConfirm();
        if (onConfirm()) this.closeConfirm();
    },
    render: function render() {
        var _props = this.props;
        var confirmBtn = _props.confirmBtn;
        var cancelBtn = _props.cancelBtn;
        var position = _props.position;
        var className = _props.className;
        var content = _props.content;
        var style = _props.style;
        var children = _props.children;
        var open = this.state.open;

        className = klassName('confirm-box popup', className);
        if (open) {
            className = className + ' _active';
        }

        return React.createElement(
            'span',
            { className: className, style: style, onClick: this.onTrigger },
            React.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                children
            ),
            React.createElement(
                'div',
                { className: '_wrap _' + position },
                React.createElement(
                    'div',
                    { ref: 'content', className: '_content' },
                    React.createElement(
                        'div',
                        { className: '_title' },
                        content
                    ),
                    React.createElement(
                        'div',
                        { className: '_action' },
                        React.createElement(
                            'div',
                            { className: '_confirm', onClick: this.handleConfirm },
                            confirmBtn ? confirmBtn : React.createElement(
                                'div',
                                null,
                                'ok'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: '_cancel', onClick: this.handleCancel },
                            cancelBtn ? cancelBtn : React.createElement(
                                'div',
                                null,
                                'cancel'
                            )
                        )
                    ),
                    React.createElement('span', { className: '_arrow', ref: 'arrow' })
                )
            )
        );
    }
});

module.exports = ConfirmBox;