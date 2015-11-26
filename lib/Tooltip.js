'use strict';

var React = require('react');
var css = require('../css/popup.less');
var DocumentClickMixin = require('../mixin/DocumentClickMixin');
var PopUpMixin = require('../mixin/PopUpMixin');

var Tooltip = React.createClass({
    displayName: 'Tooltip',

    mixins: [DocumentClickMixin, PopUpMixin],

    onOtherDomClick: function onOtherDomClick(e) {
        this.setState({
            open: false
        });
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
                )
            )
        ) : null;
        return React.createElement(
            'span',
            { className: 'ui confirm-box popup', style: this.props.style, onMouseOver: this.onTrigger, onMouseLeave: this.onTrigger },
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