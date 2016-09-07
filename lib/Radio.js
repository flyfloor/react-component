'use strict';

var React = require('react');
var klassName = require('./util/className');

var Radio = React.createClass({
    displayName: 'Radio',

    propTypes: {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        value: React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    checkedChange: function checkedChange(e) {
        var _props = this.props;
        var value = _props.value;
        var onChange = _props.onChange;

        if (onChange) onChange(e, value);
    },
    render: function render() {
        var _props2 = this.props;
        var className = _props2.className;
        var checked = _props2.checked;
        var disabled = _props2.disabled;
        var style = _props2.style;
        var children = _props2.children;

        className = klassName(className, 'radio');
        if (disabled) {
            className = className + ' _disabled';
        }
        return React.createElement(
            'label',
            { style: style, className: className },
            React.createElement('input', { type: 'radio', ref: 'radioInput', disabled: disabled, checked: checked, onChange: this.checkedChange }),
            children
        );
    }
});

module.exports = Radio;