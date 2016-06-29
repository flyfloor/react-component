import React from 'react';
import {DatePicker} from './index';

export default class DatePickerDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null
        };
    }

    handleValChange(value){
        this.setState({
            value
        });
    }

    render() {
        return (
            <div>
                <h3>Date picker</h3>
                <ul>
                    <li>
                        <h4>Default datepicker</h4>
                        <DatePicker/>
                        <pre>
                            <code>
                                {`<DatePicker/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with default value</h4>
                        <DatePicker value='2014-10-05'/>
                        <pre>
                            <code>
                                {`<DatePicker value='2014-10-05'/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with onChange event</h4>
                        <p>value has changed to {this.state.value}</p>
                        <DatePicker onChange={this.handleValChange.bind(this)}/>
                        <pre>
                            <code>
                                {`<DatePicker onChange={handleValChange}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with time range</h4>
                        <DatePicker begin='2015-12-15' end='2016-11-23'/>
                        <pre>
                            <code>
                                {`<DatePicker begin='2015-12-15' end='2016-11-23'/>`}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
