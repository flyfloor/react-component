import React from 'react';
import {CheckBox} from "./index.js";

export default class CheckBoxDemo extends React.Component {
    handleChange(e){
        console.log(e.target.checked)
    }
    render() {
        return (
            <ul className="three">
                <li>
                    <h4>Default checkbox</h4>
                    <CheckBox onChange={this.handleChange.bind(this)}>checkbox</CheckBox>
                </li>
                <li>
                    <h4>Disabled checkbox</h4>
                    <CheckBox disabled="true">disabled checkbox</CheckBox>
                </li>
                <li>
                    <h4>Checked checkbox</h4>
                    <CheckBox checked="true">checked checkbox</CheckBox>
                </li>
            </ul>
        );
    }
}
