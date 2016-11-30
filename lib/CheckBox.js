'use strict';

var React = require('react');
var klassName = require('./util/className');

var CheckBox = React.createClass({
    displayName: 'CheckBox',

    propTypes: {
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        className: React.PropTypes.string
    },
    getInitialState: function getInitialState() {
        return {
            checked: this.props.checked
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            checked: false
        };
    },
    checkedChange: function checkedChange(e) {
        var _props = this.props,
            onChange = _props.onChange,
            value = _props.value;

        this.setState({
            checked: e.target.checked
        });
        if (onChange) onChange(e, value);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            this.setState({
                checked: nextProps.checked
            });
        }
    },
    render: function render() {
        var _props2 = this.props,
            disabled = _props2.disabled,
            style = _props2.style,
            className = _props2.className,
            children = _props2.children;

        if (disabled) {
            className = klassName('disabled', className);
        }
        className = klassName(className, 'checkbox');
        var checked = this.state.checked;

        return React.createElement(
            'label',
            { style: style, className: className },
            React.createElement('input', { type: 'checkbox', disabled: disabled,
                checked: checked, onChange: this.checkedChange }),
            React.createElement(
                'span',
                null,
                children
            )
        );
    }
});

module.exports = CheckBox;