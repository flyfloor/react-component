'use strict';

var React = require('react');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var PopUpMixin = require('./mixin/PopUpMixin');

var Tooltip = React.createClass({
    displayName: 'Tooltip',

    mixins: [DocumentClickMixin, PopUpMixin],

    onOtherDomClick: function onOtherDomClick(e) {
        this.setState({
            open: false
        });
    },
    handleOpen: function handleOpen(e) {
        this.onTrigger(e, true);
    },
    handleClose: function handleClose(e) {
        this.onTrigger(e, false);
    },
    render: function render() {
        var content = this.state.open ? React.createElement(
            'div',
            { className: '_wrap _' + this.props.position },
            React.createElement(
                'div',
                { ref: 'content', className: '_content' },
                React.createElement(
                    'div',
                    { className: '_title' },
                    this.props.title
                ),
                React.createElement('span', { className: '_arrow', ref: 'arrow' })
            )
        ) : null;
        return React.createElement(
            'span',
            { className: 'ui confirm-box popup', style: this.props.style, onMouseOver: this.handleOpen, onMouseLeave: this.handleClose },
            React.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                this.props.children
            ),
            content
        );
    }
});

module.exports = Tooltip;