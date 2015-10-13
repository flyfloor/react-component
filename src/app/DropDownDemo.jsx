import {DropDown} from './index.js';

const options = [
    {'name': 'A', 'value': 'a'},
    {'name': 'B', 'value': 'b'},
    {'name': 'C', 'value': 'c'},
    {'name': 'D', 'value': 'd'},
]


export default class DropDownDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        }
    }

    displayChange(value){
        this.setState({
            value: value, 
        });
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>drop down</h4>
                    <p>you selected option value is {this.state.value}</p>
                    <DropDown options={options} labelName='name' valueName='value' searchable='true' onChange={this.displayChange.bind(this)} />
                </li>
            </ol>
        );
    }
}
