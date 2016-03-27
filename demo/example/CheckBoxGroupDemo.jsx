import React from 'react';
import {CheckBoxGroup, CheckBox} from "./index.js";

const options = [
    {'name': 'A', 'value': 'a'},
    {'name': 'B', 'value': 'b'},
    {'name': 'C', 'value': 'c'},
    {'name': 'D', 'value': 'd'},
];

const checkedVal = ['b', 'd'];
const checkedVal1 = ['banana'];

export default class CheckBoxGroupDemo extends React.Component {
    constructor(props, refs){
        super(props);
        this.state = {
            displayText: checkedVal.join(','),
            displayText1: checkedVal1.join(','),
        };
    }

    displayChange(stat, value){
        this.setState({
            [String(stat)]: value.join(','), 
        });
    }

    render() {
        return (
            <div>
                <h3>Checkbox group</h3>
                <ul className="two">
                    <li>
                        <h4>Checkbox group</h4>
                        <p>you selected value is {this.state.displayText}</p>
                        <CheckBoxGroup options={options} labelName='name' 
                            valueName='value' value={checkedVal} 
                            onChange={this.displayChange.bind(this, 'displayText')} />
                    </li>
                    <li>
                        <h4>Checkbox group with yield childrens</h4>
                        <p>you selected value is {this.state.displayText1}</p>
                        <CheckBoxGroup value={checkedVal1} onChange={this.displayChange.bind(this, 'displayText1')}>
                            <CheckBox value="apple">apple</CheckBox>
                            <CheckBox value="banana">banana</CheckBox>
                            <CheckBox value="cake" disabled={true}>cake</CheckBox>
                        </CheckBoxGroup>
                    </li>
                </ul>
            </div>
        );
    }
}
