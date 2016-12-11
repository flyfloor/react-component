import React, { Component } from 'react';
import {TimePicker} from './index';

export default class TimePickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '12:13:34'
        }
    }
    handleValueChange(value) {
        this.setState({
            value
        });
    }
    render() {
        return (
            <div>
                <h3>Time picker</h3>
                <ul>
                    <li>
                        <h4>default time picker</h4>
                        <TimePicker onChange={value => console.log(value)} />
                    </li>
                    <li>
                        <h4>time picker with given value, value is {this.state.value}</h4>
                        <TimePicker value={this.state.value} onChange={this.handleValueChange.bind(this)} />
                    </li>
                    <li>
                        <h4></h4>
                    </li>
                    <li>
                        <h4></h4>
                    </li>
                </ul>
            </div>
        );
    }
}
