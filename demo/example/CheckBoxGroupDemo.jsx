import React from 'react';
import {CheckBoxGroup, CheckBox} from "./index.js";

const options = [
    {'name': 'apple', 'value': 'a'},
    {'name': 'banana', 'value': 'b', disabled: true},
    {'name': 'cat', 'value': 'c'},
    {'name': 'dog', 'value': 'd'},
];

const checkedVal = ['a', 'd'];
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
                <ul>
                    <li>
                        <h4>Checkbox group</h4>
                        <p>you selected value is {this.state.displayText}</p>
                        <CheckBoxGroup options={options} labelName='name' 
                            valueName='value' value={checkedVal} 
                            onChange={this.displayChange.bind(this, 'displayText')} />
                        <pre>
                            <code>
                                {'<CheckBoxGroup options={options} labelName="name"'}
                                <br/>
                                {'  valueName="value" value={value}'}
                                <br/>
                                {'  onChange={displayChange} />'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Checkbox group yield childrens</h4>
                        <p>you selected value is {this.state.displayText1}</p>
                        <CheckBoxGroup value={checkedVal1} onChange={this.displayChange.bind(this, 'displayText1')}>
                            <CheckBox value="apple">apple</CheckBox>
                            <CheckBox value="banana">banana</CheckBox>
                            <CheckBox value="cat" disabled={true}>cat</CheckBox>
                        </CheckBoxGroup>
                        <pre>
                            <code>
                                {'<CheckBoxGroup value={checkedVal1} onChange={handleChange}>'}
                                <br/>
                                {'  <CheckBox value="apple">apple</CheckBox>'}
                                <br/>
                                {'  <CheckBox value="banana">banana</CheckBox>'}
                                <br/>
                                {'  <CheckBox value="cat" disabled={true}>cat</CheckBox>'}
                                <br/>
                                {'</CheckBoxGroup>'}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
