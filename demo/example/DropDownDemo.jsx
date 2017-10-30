import React, { Component } from 'react';
import {DropDown, Item} from './index.js';

const options = [
    {name: 'apple', value: 1},
    {name: 'banana', value: 2},
    {name: 'cat', value: 3, disabled: true},
    {name: 'dog', value: 4},
    {name: 'egg', value: 5},
];


export default class DropDownDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            value1: 5,
            value2: '',
            value3: [2, 4],
            value4: [1, 3],
            value5: null,
            value6: [],
        };
    }

    displayChange(stat, value){
        this.setState({
            [String(stat)]: value,
        });
    }

    render() {
        return (
            <div style={{"minHeight": 2200}}>
                <h3>Dropdown</h3>
                <ul>
                    <li>
                        <h4>Default dropdown</h4>
                        <p>you selected option value is <span className="gap-word">{this.state.value}</span></p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                valueName='value' 
                                onChange={this.displayChange.bind(this, 'value')} />
                        </div>
                        <pre>
                            <code>
{`<DropDown 
    options={options} 
    labelName='name' 
    valueName='value' 
    onChange={displayChange} 
/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Disabled dropdown</h4>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                valueName='value' 
                                disabled
                                onChange={val => val} />
                        </div>
                        <pre>
                            <code>
{`<DropDown 
    options={options} 
    labelName='name' 
    valueName='value' 
    disabled
    onChange={displayChange} 
/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Dropdown with default selected</h4>
                        <p>this will change value of next dropdown</p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                valueName='value' 
                                onChange={this.displayChange.bind(this, 'value1')} defaultSelected={true}/>
                        </div>
                        <pre>
                            <code>
{`<DropDown 
    options={options} 
    labelName='name' 
    valueName='value' 
    onChange={displayChange} 
    defaultSelected
/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Dropdown received value</h4>
                        <p>will not change previous value</p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                valueName='value'
                                value={this.state.value1} 
                                onChange={this.displayChange.bind(this, 'value1')}
                            />
                        </div>
                        <pre>
                            <code>
{`
<DropDown 
    options={options} 
    labelName='name' 
    value={value} 
    onChange={displayChange}
    valueName='value'
/>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Dropdown with search field</h4>
                        <p>this will change value of prev dropdown</p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                onChange={this.displayChange.bind(this, 'value1')}
                                valueName='value' 
                                searchable
                                onSearch={text => console.log(text)}
                            />
                        </div>
                        <pre>
                            <code>
{`
<DropDown 
    options={options} 
    labelName='name' 
    onChange={displayChange}
    valueName='value' 
    searchable
/>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Multiple dropdown</h4>
                        <p>selected value is <span className="gap-word">{this.state.value2}</span></p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                valueName='value' 
                                multi 
                                value={this.state.value2}
                                onChange={this.displayChange.bind(this, 'value2')}/>
                        </div>
                        <pre>
                            <code>
{`
<DropDown 
    options={options} 
    labelName='name' 
    valueName='value' 
    multi 
    value={value}
    onChange={displayChange}
/>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Multiple dropdown</h4>
                        <p>change previous value</p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                labelName='name' 
                                value={this.state.value3} 
                                valueName='value' 
                                multi
                                onChange={this.displayChange.bind(this, 'value2')}/>
                        </div>
                        <pre>
                            <code>
{`
<DropDown 
    options={options} 
    labelName='name' 
    value={value} 
    valueName='value' 
    multi
    onChange={displayChange}
/>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Yield children</h4>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                labelName="name" 
                                valueName="value"
                                value={this.state.value1} 
                                onChange={this.displayChange.bind(this, 'value5')}>
                                <Item value={1} name="apple">
                                    <p>hate the show, love the animal</p>
                                    <img style={{ "width": "100px"}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/sad-morty.png" alt=""/>
                                </Item>
                                <Item value={2} name="banana">
                                    <h2>this is banana</h2>
                                </Item>
                                <Item value={3} name="cat">
                                    <h4>this is cat</h4>
                                </Item>
                                <Item value={4} name="dog" disabled={true}>
                                    blog site: <a href="http://braavos.me" target="_blank">lacuna</a>
                                </Item>
                                <Item value={5} name="egg">
                                    <i style={{'fontStyle': 'italic'}}>egg's gooood</i>
                                </Item>
                            </DropDown>
                        </div>
                        <pre>
                            <code>
{`
<DropDown 
    labelName="name" 
    valueName="value"
    value={value} 
    onChange={displayChange}>
    <Item 
        value={1} 
        name="apple">
        <p>hate the show, love the animal</p>
        <img style={{ "width": "100px"}} 
            src="https://raw.githubusercontent.com/jerryshew/design/master/png/sad-morty.png" 
            alt=""
        />
        ...
    </Item>
    ...
</DropDown>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Yield children(multi)</h4>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                multi 
                                labelName="name" 
                                valueName="value"
                                value={this.state.value4} 
                                onChange={this.displayChange.bind(this, 'value6')}>
                                <Item value={1} name="apple">
                                    <p>hate the show, love the animal</p>
                                    <img style={{ "width": "100px"}} src="https://raw.githubusercontent.com/jerryshew/design/master/png/sad-morty.png" alt=""/>
                                </Item>
                                <Item value={2} name="banana">
                                    <h2>this is banana</h2>
                                </Item>
                                <Item value={3} name="cat">
                                    <h4>this is cat</h4>
                                </Item>
                                <Item value={4} name="dog" disabled={true}>
                                    blog site: <a href="http://braavos.me" target="_blank">lacuna</a>
                                </Item>
                                <Item value={5} name="egg">
                                    <i style={{'fontStyle': 'italic'}}>egg's gooood</i>
                                </Item>
                            </DropDown>
                        </div>
                        <pre>
                            <code>
{`
<DropDown 
    multi 
    labelName="name" 
    valueName="value"
    value={value} 
    onChange={displayChange}>
    <Item 
        value={1} 
        name="apple">
        ...
    </Item>
    ...
</DropDown>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>DropDown with position</h4>
                        <p>top/bottom, default is bottom</p>
                        <div style={{'width': '280px'}}>
                            <DropDown 
                                options={options} 
                                position="top"
                                onChange={value => console.log(value)}/>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
