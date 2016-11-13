'use strict';

var React = require('react');
var klassName = require('./util/className');
var PropTypes = React.PropTypes;

var Radio = React.createClass({
    displayName: 'Radio',

    propTypes: {
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        className: PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    checkedChange: function checkedChange(e) {
        var _props = this.props,
            value = _props.value,
            onChange = _props.onChange;

        if (onChange) onChange(e, value);
    },
    render: function render() {
        var _props2 = this.props,
            className = _props2.className,
            checked = _props2.checked,
            disabled = _props2.disabled,
            style = _props2.style,
            children = _props2.children;

        className = klassName(className, 'radio');
        if (disabled) {
            className = className + ' _disabled';
        }
        return React.createElement(
            'label',
            { style: style, className: className },
            React.createElement('input', { type: 'radio', ref: 'radioInput', disabled: disabled, checked: checked, onChange: this.checkedChange }),
            React.createElement(
                'span',
                null,
                children
            )
        );
    }
});

module.exports = Radio;