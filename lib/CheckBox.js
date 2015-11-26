const React = require('react');

export const CheckBox = React.createClass({
    displayName: "CheckBox",

    propTypes: {
        onChange: React.PropTypes.func
    },
    getInitialState() {
        return {
            checked: this.props.checked
        };
    },
    checkedChange(e) {
        this.setState({
            checked: e.target.checked
        });
        if (this.props.onChange) this.props.onChange(e, this.props.storeValue);
    },

    render() {
        // let {disabled, storeValue, onChange, ...props} = this.props;
        return React.createElement(
            "label",
            { style: this.props.style, className: this.props.className },
            React.createElement("input", { type: "checkbox", disabled: this.props.disabled, checked: this.state.checked, onChange: this.checkedChange }),
            this.props.children
        );
    }
});

module.exports = CheckBox;