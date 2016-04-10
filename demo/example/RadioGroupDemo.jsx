import React from 'react';
import {RadioGroup, Radio} from './index.js';

const options = [
    {'name': 'apple', 'value': 'a'},
    {'name': 'banana', 'value': 'b', disabled: true},
    {'name': 'cat', 'value': 'c'},
    {'name': 'dot', 'value': 'd'},
];

const checkedVal = 'c';

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
                            <Radio value="a">apple</Radio>
                            <Radio value="b">banana</Radio>
                            <Radio value="c">cat</Radio>
                            <Radio value="d" disabled={true}>dog</Radio>
                        </RadioGroup>
                    </li>
                </ul>
            </div>
        );
    }
}
