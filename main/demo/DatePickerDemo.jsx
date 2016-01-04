import React from 'react';
import {DatePicker} from './index';

export default class DatePickerDemo extends React.Component {
    render() {
        return (
            <ul className="two">
                <li>
                    <h4>Default datepicker</h4>
                    <DatePicker/>
                </li>
                <li>
                    <h4>DatePicker with time range</h4>
                    <DatePicker value='2014-03-23'/>
                </li>
                <li>
                    <h4>DatePicker with time range</h4>
                    <DatePicker begin='2013-03-08' end='2015-12-23'/>
                </li>
                <li>
                    <h4>DatePicker with time range</h4>
                    <DatePicker begin='2013-03-08' end='2015-15-23'/>
                </li>
            </ul>
        );
    }
}
