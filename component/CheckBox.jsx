import React from 'react';

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
        };
    }
    
    checkedChange(e){
        this.setState({
            checked: e.target.checked
        });
        if(this.props.onChange) this.props.onChange(e, this.props.storeValue);
    }

    render() {
        // let {disabled, storeValue, onChange, ...props} = this.props;
        return ( 
            <label style={this.props.style} className={this.props.className}>
                <input type="checkbox" disabled={this.props.disabled} checked={this.state.checked} onChange={this.checkedChange.bind(this)}/>
                {this.props.children}
            </label>
        );
    }
}

CheckBox.propTypes = {
    onChange: React.PropTypes.func,
}