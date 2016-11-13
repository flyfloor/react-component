const React = require('react')
const klassName = require('./util/className')
const PropTypes = React.PropTypes

const Radio = React.createClass({
    propTypes: {
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        className: PropTypes.string,
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
                <span>{children}</span>
            </label>
        );
    }
});

module.exports = Radio;