import React from 'react';
import {Calender} from './index.js';
import {formatDate} from '../../component/util/datetime';

export default class CalenderDemo extends React.Component {
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
                <h3>Calender</h3>
                <ul>
                    <li>
                        <h4>Default Calender</h4>
                        <Calender/>
                        <pre>
                            <code>
                                {'<Calender/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calender with given value</h4>
                        <Calender value={new Date("2016-04-20")}/>
                        <pre>
                            <code>
                                {'<Calender value={new Date("2016-04-20")}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calender value change event</h4>
                        <p>date changed to {formatDate(this.state.value)}</p>
                        <Calender value={this.state.value} onChange={this.handleChange.bind(this)}/>
                        <pre>
                            <code>
                                {'<Calender value={this.state.value} onChange={handleChange}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calender with begin and end</h4>
                        <Calender begin={new Date("2015-12-15")} end={new Date("2016-11-08")}/>
                        <pre>
                            <code>
                                {'<Calender begin={new Date("2015-12-15")} end={new Date("2016-11-08")}/>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calender with no preview</h4>
                        <Calender showPreview={false}/>
                        <pre>
                            <code>
                                {'<Calender showPreview={false} />'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Calender with type</h4>
                        <p>month:</p>
                        <Calender type='month' />
                        <pre>
                            <code>
                                {'<Calender type="month" />'}
                            </code>
                        </pre>
                        <br/>
                        <p>year:</p>
                        <Calender type='year' />
                        <pre>
                            <code>
                                {'<Calender type="year" />'}
                            </code>
                        </pre>
                        <br/>
                    </li>
                </ul>
            </div>
        );
    }
}
