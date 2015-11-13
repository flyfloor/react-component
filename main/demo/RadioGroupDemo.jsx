import React from 'react';
import {RadioGroup} from './index.js';

const options = [
    {'name': 'A', 'value': 'a'},
    {'name': 'B', 'value': 'b'},
    {'name': 'C', 'value': 'c'},
    {'name': 'D', 'value': 'd'},
]

const checkedVal = 'b';

export default class RadioDemo extends React.Component {
    constructor(props, refs){
        super(props);
        this.state = {
            displayText: checkedVal,
        }
    }

    displayChange(value){
        this.setState({
            displayText: value, 
        });
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>radio group</h4>
                    <p>you selected value is {this.state.displayText}</p>
                    <RadioGroup options={options} labelName='name' valueName='value' value={checkedVal} onChange={this.displayChange.bind(this)}/>
                </li>
                <li>
                    <h4>radio group with default first selected</h4>
                    <RadioGroup options={options} labelName='name' valueName='value' defaultChecked='true' />
                </li>
            </ol>
        );
    }
}
