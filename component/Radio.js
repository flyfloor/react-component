const React = require('react');

const Radio = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        value: React.PropTypes.string,
    },

    checkedChange(e){
        const {value, onChange} = this.props;
        if(onChange) onChange(e, value);
    },

    render() {
        const {className, checked, disabled, style} = this.props;
        return (
            <label style={style} className={className}>
                <input type="radio" ref="radioInput" disabled={disabled} checked={checked} onChange={this.checkedChange} />
                {this.props.children}
            </label>
        );
    }
});

module.exports = Radio;