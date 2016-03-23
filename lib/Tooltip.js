'use strict';

var React = require('react');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var PopUpMixin = require('./mixin/PopUpMixin');

var Tooltip = React.createClass({
    displayName: 'Tooltip',

    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        content: React.PropTypes.element.isRequired
    },

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
        var open = this.state.open;
        var _props = this.props;
        var position = _props.position;
        var content = _props.content;
        var style = _props.style;
        var className = _props.className;
        var children = _props.children;

        var contentNode = this.state.open ? React.createElement(
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
                React.createElement('span', { className: '_arrow', ref: 'arrow' })
            )
        ) : null;
        return React.createElement(
            'span',
            { className: 'ui confirm-box popup', style: style,
                onMouseOver: this.handleOpen, onMouseLeave: this.handleClose },
            React.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                children
            ),
            contentNode
        );
    }
});

module.exports = Tooltip;