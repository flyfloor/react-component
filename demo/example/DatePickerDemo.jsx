import React, { Component } from 'react';
import {DatePicker} from './index';

import {formatDate} from '../../component/util/datetime';

export default class DatePickerDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: undefined,
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
                        <DatePicker onChange={this.handleValChange.bind(this)}/>
                        <pre>
                            <code>
                                {`<DatePicker onChange={onChangeFunction}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with format</h4>
                        <DatePicker format="yyyy年MM月dd日" onChange={(value) => console.log(value) } />
                        <pre>
                            <code>
                                {`<DatePicker format="yyyy年MM月dd日" onChange={onChangeFunction} />`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with default value</h4>
                        <DatePicker value={new Date('2014-10-05')} onChange={(value) => console.log(value) } />
                        <pre>
                            <code>
                                {`<DatePicker value={new Date('2014-10-05')} onChange={onChangeFunction} />`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with onChange event</h4>
                        <p>value has changed to {formatDate(this.state.value)}</p>
                        <DatePicker value={this.state.value} onChange={this.handleValChange.bind(this)}/>
                        <pre>
                            <code>
                                {`<DatePicker onChange={onChangeFunction}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with time range</h4>
                        <DatePicker begin={new Date('2015-12-15')} 
                            end={new Date('2016-11-23')} 
                            onChange={value => console.log(value) }/>
                        <pre>
                            <code>
                                {`<DatePicker begin={new Date('2015-12-15')} end={new Date('2016-11-23')} onChange={onChangeFunction}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with type</h4>
                        <p>month:</p>
                        <DatePicker type='month' onChange={value => console.log(value) }/>
                        <pre>
                            <code>
                                {`<DatePicker type='month' onChange={value => console.log(value) }/>`}
                            </code>
                        </pre>

                        <p>year:</p>
                        <DatePicker type='year' onChange={value => console.log(value) }/>
                        <pre>
                            <code>
                                {`<DatePicker type='year' onChange={value => console.log(value) }/>`}
                            </code>
                        </pre>

                        <p>day:</p>
                        <DatePicker type='day' onChange={value => console.log(value) }/>
                        <pre>
                            <code>
                                {`<DatePicker type='day' onChange={value => console.log(value) }/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DatePicker with position</h4>
                        <p>top/left/right/bottom, default is bottom</p>
                        <DatePicker position='top' onChange={value => console.log(value) }/>
                        <br/>
                        <DatePicker position='left' onChange={value => console.log(value) }/>
                        <br/>
                        <DatePicker position='right' onChange={value => console.log(value) }/>
                        <br/>
                        <pre>
                            <code>
                                {`<DatePicker position='top' onChange={value => console.log(value) }/>`}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
