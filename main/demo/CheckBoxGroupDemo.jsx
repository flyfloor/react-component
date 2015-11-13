import React from 'react';
import {CheckBoxGroup} from "./index.js";

const options = [
    {'name': 'A', 'value': 'a'},
    {'name': 'B', 'value': 'b'},
    {'name': 'C', 'value': 'c'},
    {'name': 'D', 'value': 'd'},
]

const checkedVal = ['b', 'd'];
const checkedVal1 = ['banana'];

export default class CheckBoxGroupDemo extends React.Component {
    constructor(props, refs){
        super(props);
        this.state = {
            displayText: checkedVal.join(','),
        }
    }

    displayChange(value){
        this.setState({
            displayText: value.join(','), 
        });
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>checkbox group</h4>
                    <p>you selected value is {this.state.displayText}</p>
                    <CheckBoxGroup options={options} labelName='name' valueName='value' value={checkedVal} onChange={this.displayChange.bind(this)} />
                </li>
            </ol>
        );
    }
}
