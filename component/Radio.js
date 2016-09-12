const React = require('react');
const klassName = require('./util/className');

const Radio = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        value: React.PropTypes.string,
        className: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            className: '',
        };
    },

    checkedChange(e){
        const {value, onChange} = this.props;
        if(onChange) onChange(e, value);
    },

    render() {
        let {className, checked, disabled, style, children} = this.props;
        className = klassName(className, 'radio');
        if (disabled) {
            className = `${className} _disabled`;
        }
        return (
            <label style={style} className={className}>
                <input type="radio" ref="radioInput" disabled={disabled} checked={checked} onChange={this.checkedChange} />
                {children}
            </label>
        );
    }
});

module.exports = Radio;