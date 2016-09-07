'use strict';

var React = require('react');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var PopUpMixin = require('./mixin/PopUpMixin');
var klassName = require('./util/className');

var Tooltip = React.createClass({
    displayName: 'Tooltip',

    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        content: React.PropTypes.element.isRequired,
        mode: React.PropTypes.oneOf(['hover', 'click'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            mode: 'hover'
        };
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            open: false
        });
    },
    render: function render() {
        var _this = this;

        var open = this.state.open;
        var _props = this.props;
        var position = _props.position;
        var content = _props.content;
        var style = _props.style;
        var className = _props.className;
        var children = _props.children;
        var mode = _props.mode;

        className = klassName('popup', className);
        if (open) {
            className = className + ' _active';
        }

        var onMouseLeave = null,
            onMouseEnter = null,
            onClick = null;

        if (mode === 'click') {
            onClick = function onClick(e) {
                return _this.onTrigger(e);
            };
        } else {
            onMouseEnter = function onMouseEnter(e) {
                return _this.onTrigger(e, true);
            };
            onMouseLeave = function onMouseLeave(e) {
                return _this.onTrigger(e, false);
            };
        }

        return React.createElement(
            'span',
            { className: className, style: style, onClick: onClick,
                onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
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
                    React.createElement('span', { className: '_arrow', ref: 'arrow' })
                )
            )
        );
    }
});

module.exports = Tooltip;