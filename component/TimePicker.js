import React from 'react';
import {validateTime} from './util/Time';

const TimePicker = React.createClass({
    getInitialState() {
        return {
            value: this.props.value,
        };
    },

    getDefaultProps() {
        return {
            value: '00:00:00'
        };
    },

    handleInputChange(e){
        this.setState({
            value: e.target.value,
        });
    },

    handleBlur(e){
        let value = validateTime(e.target.value);
        this.setState({
            value: value,
        });
    },

    render() {
        return (
            <div>
                <input type="text" defaultValue={this.state.value} value={this.state.value} onBlur={this.handleBlur} onChange={this.handleInputChange}/>
            </div>
        );
    }
});


export default TimePicker;