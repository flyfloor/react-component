import React from 'react';
import {TimePicker} from './index.js';

export default class TimePickerDemo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showTime: '13:12:31'
        }
    }

    handleTimeChange(value){
        this.setState({
            showTime: value
        });
    }

    render() {
        return (
            <ul className="three">
                <li>
                    <h4>Default timepicker</h4>
                    <TimePicker/>
                </li>
                <li>
                    <h4>Timepicker with given value</h4>
                    <TimePicker value="12:44:23"/>
                </li>
                <li>
                    <h4>Timepicker with limit range</h4>
                    <TimePicker value="11:21:08" begin="8:30" end="16:45:08"/>
                </li>
                <li>
                    <h4>Onchange event</h4>
                    <p>time you selected is {this.state.showTime}</p>
                    <TimePicker onChange={this.handleTimeChange.bind(this)} value={this.state.showTime}/>
                </li>
                <li>
                    <h4>simple</h4>
                    <TimePicker simple="true" value="2:12"/>
                </li>
            </ul>
        );
    }
}
