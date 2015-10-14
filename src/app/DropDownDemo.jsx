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
            value1: 'egg',
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

    render() {
        return (
            <ol>
                <li>
                    <h4>drop down</h4>
                    <p>you selected option value is {this.state.value}</p>
                    <DropDown options={options} labelName='name' valueName='value' onChange={this.displayChange.bind(this)} />
                </li>
                <li>
                    <h4>drop down with search</h4>
                    <p>you selected option value is {this.state.value1}</p>
                    <DropDown options={options} ref='dropDown1' labelName='name' valueName='value' searchable='true' onChange={this.displayChange1.bind(this)}/>
                </li>
            </ol>
        );
    }
}
