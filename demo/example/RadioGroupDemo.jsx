import React from 'react';
import {RadioGroup, Radio} from './index.js';

const options = [
    {'name': 'A', 'value': 'a'},
    {'name': 'B', 'value': 'b'},
    {'name': 'C', 'value': 'c'},
    {'name': 'D', 'value': 'd'},
];

const checkedVal = 'b';

export default class RadioDemo extends React.Component {
    constructor(props, refs){
        super(props);
        this.state = {
            displayText: checkedVal,
        };
    }

    displayChange(value){
        this.setState({
            displayText: value, 
        });
    }

    render() {
        return (
            <div>
                <h3>Radio group</h3>
                <ul className="two">
                    <li>
                        <h4>Default radio group</h4>
                        <RadioGroup options={options} labelName='name' valueName='value'/>
                    </li>
                    <li>
                        <h4>Radio group with default checked</h4>
                        <RadioGroup options={options} labelName='name' valueName='value' defaultChecked={true} />
                    </li>
                    <li>
                        <h4>Radio group selected change</h4>
                        <p>you selected value is {this.state.displayText}</p>
                        <RadioGroup options={options} labelName='name' valueName='value' value={checkedVal} onChange={this.displayChange.bind(this)}/>
                    </li>
                    <li>
                        <h4>Radio group with yield children</h4>
                        <RadioGroup value={checkedVal}>
                            <Radio value="a">A</Radio>
                            <Radio value="b">B</Radio>
                            <Radio value="c">C</Radio>
                            <Radio value="d" disabled={true}>D</Radio>
                        </RadioGroup>
                    </li>
                </ul>
            </div>
        );
    }
}
