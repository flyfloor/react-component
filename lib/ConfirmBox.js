'use strict';

var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
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
        confirm: React.PropTypes.element,
        cancel: React.PropTypes.element
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
        var _props = this.props,
            confirm = _props.confirm,
            cancel = _props.cancel,
            position = _props.position,
            className = _props.className,
            content = _props.content,
            style = _props.style,
            children = _props.children;
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
                ReactCssTransitionGroup,
                { className: '_wrap _' + position, transitionName: 'popup',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? React.createElement(
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
                            confirm ? confirm : React.createElement(
                                'div',
                                null,
                                'ok'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: '_cancel', onClick: this.handleCancel },
                            cancel ? cancel : React.createElement(
                                'div',
                                null,
                                'cancel'
                            )
                        )
                    ),
                    React.createElement('span', { className: '_arrow', ref: 'arrow' })
                ) : null
            )
        );
    }
});

module.exports = ConfirmBox;