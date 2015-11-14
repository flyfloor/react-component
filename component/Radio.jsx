import React from 'react';

export default class Radio extends React.Component {
    constructor(props){
        super(props)
    }
    
    checkedChange(e){
        if(this.props.onChange) this.props.onChange(e, this.props.storeValue);
    }

    render() {
        return (
            <label style={this.props.style} className={this.props.className}>
                <input type="radio" ref="radioInput" disabled={this.props.disabled} checked={this.props.checked} onChange={this.checkedChange.bind(this)} />
                {this.props.children}
            </label>
        );
    }
}

Radio.propTypes = {
    onChange: React.PropTypes.func,
}
