import {DropDown} from './index.js';

const options = [
    {'name': 'apple', 'value': 'alpha'},
    {'name': 'banana', 'value': 'beta'},
    {'name': 'cat', 'value': 'charlie'},
    {'name': 'dog', 'value': 'delta'},
    {'name': 'egg', 'value': 'echo'},
]


export default class DropDownDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
            value1: 'echo',
            value2: [],
            value3: ['beta', 'echo'],
        }
    }

    displayChange(value){
        this.setState({
            value: value, 
        });
    }

    displayChange1(value){
        this.setState({
            value1: value, 
        });
    }

    displayChange2(value){
        this.setState({
            value2: value, 
        });
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>drop down</h4>
                    <p>you selected option value is {this.state.value}</p>
                    <DropDown options={options} labelName='name' valueName='value' onChange={this.displayChange.bind(this)} />
                </li>
                <li>
                    <h4>drop down with default first item selected</h4>
                    <DropDown options={options} labelName='name' valueName='value' defaultSelected='true'/>
                </li>
                <li>
                    <h4>drop down got value, and selected</h4>
                    <DropDown options={options} labelName='name' value={this.state.value1} defaultSelected="true" valueName='value'/>
                </li>
                <li>
                    <h4>drop down with search</h4>
                    <p>you selected option value is {this.state.value1}</p>
                    <DropDown options={options} ref='dropDown1' labelName='name'  valueName='value' searchable='true' onChange={this.displayChange1.bind(this)}/>
                </li>
                <li>
                    <h4>drop down with multiple, not selected</h4>
                    <p>you selected option value is {this.state.value2}</p>
                    <DropDown options={options} ref='dropDown1' labelName='name' valueName='value' multi='true' onChange={this.displayChange2.bind(this)}/>
                </li>
                <li>
                    <h4>drop down with multiple value selected</h4>
                    <DropDown options={options} ref='dropDown1' labelName='name' value={this.state.value3} valueName='value' multi='true'/>
                </li>
            </ol>
        );
    }
}
