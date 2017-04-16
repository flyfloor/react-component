import React, { Component } from 'react';
import {Calendar} from './index.js';
import {formatDate} from '../../component/util/datetime';


export default class CalendarDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: undefined
        };
    }

    handleChange(value){
        this.setState({
            value 
        });
    }

    render() {
        return (
            <div>
                <h3>Calendar</h3>
                <ul>
                    <li>
                        <h4>Default Calendar</h4>
                        <Calendar/>
                        <pre>
                            <code>
                                {'<Calendar/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with given value</h4>
                        <Calendar value={new Date("2016-04-20")}/>
                        <pre>
                            <code>
                                {'<Calendar value={new Date("2016-04-20")}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar value change event</h4>
                        <p>date changed to {formatDate(this.state.value)}</p>
                        <Calendar value={this.state.value} onChange={this.handleChange.bind(this)}/>
                        <pre>
                            <code>
                                {'<Calendar value={this.state.value} onChange={handleChange}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with begin and end</h4>
                        <Calendar begin={new Date("2015-12-15")} end={new Date("2016-11-08")}/>
                        <pre>
                            <code>
                                {'<Calendar begin={new Date("2015-12-15")} end={new Date("2016-11-08")}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with no preview</h4>
                        <Calendar showPreview={false}/>
                        <pre>
                            <code>
                                {'<Calendar showPreview={false} />'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with type</h4>
                        <p>month:</p>
                        <Calendar type='month' />
                        <pre>
                            <code>
                                {'<Calendar type="month" />'}
                            </code>
                        </pre>
                        <br/>
                        <p>year:</p>
                        <Calendar type='year' />
                        <pre>
                            <code>
                                {'<Calendar type="year" />'}
                            </code>
                        </pre>
                        <br/>
                    </li>
                </ul>
            </div>
        );
    }
}
