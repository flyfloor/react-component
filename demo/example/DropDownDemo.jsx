import React from 'react';
import {DropDown} from './index.js';

const options = [
    {name: 'apple', value: 1},
    {name: 'banana', value: 2},
    {name: 'cat', value: 3},
    {name: 'dog', value: 4},
    {name: 'egg', value: 5},
];


export default class DropDownDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            value1: 5,
            value2: '',
            value3: [2, 4],
            value4: [1, 3],
        };
    }

    displayChange(stat, value){
        this.setState({
            [String(stat)]: value,
        });
    }

    render() {
        return (
            <div>
                <h3>Dropdown</h3>
                <ul className="two">
                    <li>
                        <h4>Default dropdown</h4>
                        <p>you selected option value is <span className="gap-word">{this.state.value}</span></p>
                        <div style={{'width': '280'}}>
                            <DropDown options={options} labelName='name' valueName='value' 
                                onSelect={this.displayChange.bind(this, 'value')} />
                        </div>
                    </li>
                    <li>
                        <h4>Dropdown with default selected</h4>
                        <p>this will change value of next dropdown</p>
                        <div style={{'width': '280'}}>
                            <DropDown options={options} labelName='name' valueName='value' 
                                onSelect={this.displayChange.bind(this, 'value1')} defaultSelected={true}/>
                        </div>
                    </li>
                    <li>
                        <h4>Dropdown received value</h4>
                        <p>will not change previous value</p>
                        <div style={{'width': '280'}}>
                            <DropDown options={options} labelName='name' value={this.state.value1} 
                                onSelect={this.displayChange.bind(this, 'value1')}
                                defaultSelected={true} valueName='value'/>
                        </div>
                    </li>
                    <li>
                        <h4>Dropdown with search field</h4>
                        <p>this will change value of prev dropdown</p>
                        <div style={{'width': '280'}}>
                            <DropDown options={options} ref='dropDown1' labelName='name' 
                                onSelect={this.displayChange.bind(this, 'value1')}
                                valueName='value' searchable={true}/>
                        </div>
                    </li>
                    <li>
                        <h4>Multiple dropdown</h4>
                        <p>selected value is <span className="gap-word">{this.state.value2}</span></p>
                        <div style={{'width': '280'}}>
                            <DropDown options={options} ref='dropDown1' labelName='name' 
                                valueName='value' multi={true} value={this.state.value2}
                                onSelect={this.displayChange.bind(this, 'value2')}/>
                        </div>
                    </li>
                    <li>
                        <h4>Multiple dropdown</h4>
                        <p>change previous value</p>
                        <div style={{'width': '280'}}>
                            <DropDown options={options} ref='dropDown1' labelName='name' 
                                value={this.state.value3} valueName='value' multi={true}
                                onSelect={this.displayChange.bind(this, 'value2')}/>
                        </div>
                    </li>
                    <li>
                        <h4>Yield children</h4>
                        <p>value is <span className="gap-word">{this.state.value5}</span></p>
                        <div style={{'width': '280'}}>
                            <DropDown multi={true} labelName="name" valueName="value"
                                value={this.state.value4} onSelect={this.displayChange.bind(this, 'value5')}>
                                <div value={1} name="apple">
                                    <p>hate the show, love the animal</p>
                                    <img style={{ "width": "100"}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/sad-morty.png" alt=""/>
                                </div>
                                <div value={2} name="banana">
                                    <h2>this is banana</h2>
                                </div>
                                <div value={3} name="cat">
                                    <h4>this is cat</h4>
                                </div>
                                <div value={4} name="dog">
                                    blog site: <a href="http://braavos.me" target="_blank">lacuna</a>
                                </div>
                                <div value={5} name="egg">
                                    <i style={{'fontStyle': 'italic'}}>egg's gooood</i>
                                </div>
                            </DropDown>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
