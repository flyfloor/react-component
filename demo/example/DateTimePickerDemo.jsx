import React, { Component } from 'react';
import {DateTimePicker} from './index';

import {formatDate} from '../../component/util/datetime';

export default class DateTimePickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: new Date(),
        }
    }
    handleValueChange(value){
        this.setState({
            value
        });
    }
    render() {
        return (
            <div>
                <h3>datetime picker</h3>
                <ul>
                    <li>
                        <h4>Default datetime picker</h4>
                        <DateTimePicker onChange={val => {}} />
                        <pre>
                            <code>
                                {`<DateTimePicker onChange={onChangeFunction} />`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Given value</h4>
                        <DateTimePicker value={new Date('2015-08-22T03:23:34')} onChange={val => {} }/>
                        <pre>
                            <code>
                                {` <DateTimePicker value={new Date('2015-08-22T03:23:34')} onChange={onChangeFunction}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>onChange function</h4>
                        <p>selected value is {formatDate(this.state.value, 'yyyy-MM-dd hh:mm:ss')}</p>
                        <DateTimePicker value={this.state.value}  onChange={this.handleValueChange.bind(this)} />
                        <pre>
                            <code>
                                {`<DateTimePicker onChange={onChangeFunction} />`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>begin and end</h4>
                        <DateTimePicker begin={new Date('2015-12-23')} end={new Date('2016-12-07')}
                             onChange={val => {} }/>
                        <pre>
                            <code>
                                {`<DateTimePicker begin={new Date('2015-12-23')} end={new Date('2016-12-07')} onChange={onChangeFunction}/>`}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
