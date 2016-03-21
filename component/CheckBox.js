const React = require('react');

export const CheckBox = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
    },
    getInitialState() {
        return {
            checked:this.props.checked, 
        };
    },
    checkedChange(e){
        this.setState({
            checked: e.target.checked
        });
        if(this.props.onChange) this.props.onChange(e, this.props.storeValue);
    },

    render() {
        // let {disabled, storeValue, onChange, ...props} = this.props;
        return ( 
            <label style={this.props.style} className={this.props.className}>
                <input type="checkbox" disabled={this.props.disabled} 
                    checked={this.state.checked} onChange={this.checkedChange}/>
                {this.props.children}
            </label>
        );
    }
});

module.exports = CheckBox;

