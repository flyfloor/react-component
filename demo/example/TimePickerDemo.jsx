import React, { Component } from 'react';
import {TimePicker} from './index';

export default class TimePickerDemo extends Component {
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
                        <h4></h4>
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
