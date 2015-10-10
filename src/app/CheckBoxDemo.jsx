import {CheckBox} from "./index.js";

export default class CheckBoxDemo extends React.Component {
    handleChange(e){
        console.log(e.target.checked)
    }
    render() {
        return (
            <ol>
                <li>
                    <h4>checked</h4>
                    <CheckBox label="checkbox1" defaultChecked="true" onChange={this.handleChange.bind(this)}/>
                </li>
                <li>
                    <h4>disabled</h4>
                    <CheckBox label="checkbox" disabled="true" />
                </li>
                <li>
                    <h4>default checked</h4>
                    <CheckBox label="checkbox2" defaultChecked="true"/>
                </li>
            </ol>
        );
    }
}
