"use strict";

var React = require('react');

var Radio = React.createClass({
    displayName: "Radio",

    propTypes: {
        onChange: React.PropTypes.func
    },

    checkedChange: function checkedChange(e) {
        if (this.props.onChange) this.props.onChange(e, this.props.storeValue);
    },
    render: function render() {
        return React.createElement(
            "label",
            { style: this.props.style, className: this.props.className },
            React.createElement("input", { type: "radio", ref: "radioInput", disabled: this.props.disabled, checked: this.props.checked, onChange: this.checkedChange }),
            this.props.children
        );
    }
});

module.exports = Radio;