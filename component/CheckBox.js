const React = require('react');
const klassName = require('./util/className');

export const CheckBox = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        className: React.PropTypes.string,
    },
    getInitialState() {
        return {
            checked:this.props.checked, 
        };
    },

    getDefaultProps() {
        return {
            className: '',
            checked: false,
        };
    },

    checkedChange(e){
        const {onChange, value} = this.props;
        this.setState({
            checked: e.target.checked
        });
        if(onChange) onChange(e, value);
    },

    render() {
        let {disabled, style, className, children} = this.props;
        if (disabled) {
            className = klassName('disabled', className);
        }
        className = klassName(className, 'checkbox');
        const {checked} = this.state;
        return ( 
            <label style={style} className={className}>
                <input type="checkbox" disabled={disabled} 
                    checked={checked} onChange={this.checkedChange}/>
                {children}
            </label>
        );
    }
});

module.exports = CheckBox;

