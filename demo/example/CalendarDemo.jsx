import React, { Component } from 'react';
import {Calendar} from './index.js';
import {formatDate} from '../../component/util/datetime';


export default class CalendarDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: undefined,
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
                        <Calendar onChange={value => value}/>
                        <pre>
                            <code>
                                {'<Calendar onChange={this.handleChange.bind(this)}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with given value</h4>
                        <Calendar value={new Date("2016-04-20")} onChange={value => value}/>
                        <pre>
                            <code>
                                {'<Calendar value={new Date("2016-04-20")} onChange={this.handleChange.bind(this)}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar value change event</h4>
                        <p>date changed to {formatDate(this.state.value)}</p>
                        <Calendar value={this.state.value} onChange={this.handleChange.bind(this)}/>
                        <pre>
                            <code>
                                {'<Calendar value={this.state.value} onChange={this.handleChange}.bind(this)/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with begin and end</h4>
                        <Calendar begin={new Date("2015-12-15")} 
                            end={new Date("2016-11-08")} onChange={value => value} />
                        <pre>
                            <code>
                                {'<Calendar begin={new Date("2015-12-15")} end={new Date("2016-11-08")} onChange={this.handleChange.bind(this)}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with no preview</h4>
                        <Calendar showPreview={false} onChange={value => value} />
                        <pre>
                            <code>
                                {'<Calendar showPreview={false}  onChange={this.handleChange.bind(this)}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calendar with type</h4>
                        <p>month:</p>
                        <Calendar type='month' onChange={value => value} />
                        <pre>
                            <code>
                                {'<Calendar type="month" onChange={this.handleChange.bind(this)} />'}
                            </code>
                        </pre>
                        <br/>
                        <p>year:</p>
                        <Calendar type='year' onChange={value => value} />
                        <pre>
                            <code>
                                {'<Calendar type="year" onChange={this.handleChange.bind(this)} />'}
                            </code>
                        </pre>
                        <br/>
                    </li>
                </ul>
            </div>
        );
    }
}
