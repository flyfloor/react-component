import React from 'react';
import {DropDown} from './index.js';

const options = [
    {'name': 'apple', 'value': 1},
    {'name': 'banana', 'value': 2},
    {'name': 'cat', 'value': 3},
    {'name': 'dog', 'value': 4},
    {'name': 'egg', 'value': 5},
]


export default class DropDownDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            value1: 5,
            value2: '',
            value3: [2, 4],
        }
    }

    displayChange(value){
        this.setState({
            value: value, 
        });
    }

    displayChange2(value){
        this.setState({
            value2: value.join(','), 
        });
    }

    render() {
        return (
            <ul className="two">
                <li>
                    <h4>Default dropdown</h4>
                    <p>you selected option value is {this.state.value}</p>
                    <div style={{'width': '300'}}>
                        <DropDown options={options} labelName='name' valueName='value' onSelect={this.displayChange.bind(this)} />
                    </div>
                </li>
                <li>
                    <h4>Dropdown with default selected</h4>
                    <div style={{'width': '300'}}>
                        <DropDown options={options} labelName='name' valueName='value' defaultSelected='true'/>
                    </div>
                </li>
                <li>
                    <h4>Dropdown received value</h4>
                    <div style={{'width': '300'}}>
                        <DropDown options={options} labelName='name' value={this.state.value1} defaultSelected="true" valueName='value'/>
                    </div>
                </li>
                <li>
                    <h4>Dropdown with search field</h4>
                    <div style={{'width': '300'}}>
                        <DropDown options={options} ref='dropDown1' labelName='name'  valueName='value' searchable='true'/>
                    </div>
                </li>
                <li>
                    <h4>Multiple dropdown</h4>
                    <p>you selected option value is {this.state.value2}</p>
                    <div style={{'width': '300'}}>
                        <DropDown options={options} ref='dropDown1' labelName='name' valueName='value' multi='true' onSelect={this.displayChange2.bind(this)}/>
                    </div>
                </li>
                <li>
                    <h4>Multiple dropdown</h4>
                    <div style={{'width': '300'}}>
                        <DropDown options={options} ref='dropDown1' labelName='name' value={this.state.value3} valueName='value' multi='true'/>
                    </div>
                </li>
            </ul>
        );
    }
}
