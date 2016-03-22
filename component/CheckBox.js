const React = require('react');

export const CheckBox = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        checked: React.PropTypes.bool,
    },
    getInitialState() {
        return {
            checked:this.props.checked, 
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
        const {disabled, style, className, children} = this.props;
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

