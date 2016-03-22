"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var React = require('react');

var CheckBox = exports.CheckBox = React.createClass({
    displayName: "CheckBox",

    propTypes: {
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        return {
            checked: this.props.checked
        };
    },
    checkedChange: function checkedChange(e) {
        var _props = this.props;
        var onChange = _props.onChange;
        var value = _props.value;

        this.setState({
            checked: e.target.checked
        });
        if (onChange) onChange(e, value);
    },
    render: function render() {
        var _props2 = this.props;
        var disabled = _props2.disabled;
        var style = _props2.style;
        var className = _props2.className;
        var children = _props2.children;
        var checked = this.state.checked;

        return React.createElement(
            "label",
            { style: style, className: className },
            React.createElement("input", { type: "checkbox", disabled: disabled,
                checked: checked, onChange: this.checkedChange }),
            children
        );
    }
});

module.exports = CheckBox;