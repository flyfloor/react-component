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
            <ol>
                <li>
                    <h4>default time picker</h4>
                    <TimePicker/>
                </li>
                <li>
                    <h4>time picker with given value</h4>
                    <TimePicker value="12:44:23"/>
                </li>
                <li>
                    <h4>time picker with limit range</h4>
                    <TimePicker maxHour="20" value="11:21:08" miniHour="3" maxMin="40" miniMin="10" miniSec="20" maxSec="50"/>
                </li>
                <li>
                    <h4>time picker onchange event</h4>
                    <p>time you selected is {this.state.showTime}</p>
                    <TimePicker onChange={this.handleTimeChange.bind(this)} value={this.state.showTime}/>
                </li>
                <li>
                    <h4>time picker with no seconds</h4>
                    <TimePicker simple="true" value="2:12"/>
                </li>
                <li>
                    <h4>with different spacer</h4>
                    <TimePicker spacer="." miniHour="3" miniMin="40" miniSec="20" />
                </li>
            </ol>
        );
    }
}
