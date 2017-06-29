import React, { Component } from 'react';
import {TimePicker} from './index';

export default class TimePickerDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 47551
        }
    }
    handleValueChange(value) {
        this.setState({
            value
        });
    }
    render() {
        return (
            <div>
                <h3>Time picker</h3>
                <ul>
                    <li>
                        <h4>default time picker</h4>
                        <TimePicker onChange={value => {} } />
                        <pre>
                            <code>{`<TimePicker onChange={onChangeFunction} />`}</code>
                        </pre>
                    </li>
                    <li>
                        <h4>time picker with given value</h4>
                        <TimePicker value={this.state.value} onChange={value => {} } />
                        <pre>
                            <code>{`<TimePicker value={"${this.state.value}"} onChange={onChangeFunction} />`}</code>
                        </pre>
                    </li>
                    <li>
                        <h4>time picker onChange, value is {this.state.value}</h4>
                        <TimePicker value={this.state.value} onChange={this.handleValueChange.bind(this)} />
                        <pre>
                            <code>{`<TimePicker onChange={onChangeFunction} />`}</code>
                        </pre>
                    </li>
                    <li>
                        <h4>simple time picker</h4>
                        <TimePicker simple={true} onChange={value => {} } />
                        <pre>
                            <code>{`<TimePicker simple={true} onChange={onChangeFunction} />`}</code>
                        </pre>
                    </li>
                    <li>
                        <h4>TimePicker with position</h4>
                        <p>top/bottom, default is bottom</p>
                        <TimePicker position="top" onChange={value => value } />
                        <pre>
                            <code>{`<TimePicker position="top" onChange={onChangeFunction} />`}</code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
