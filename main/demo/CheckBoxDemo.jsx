import React from 'react';
import {CheckBox} from "./index.js";

export default class CheckBoxDemo extends React.Component {
    handleChange(e){
        console.log(e.target.checked)
    }
    render() {
        return (
            <ol>
                <li>
                    <h4>checkbox</h4>
                    <CheckBox onChange={this.handleChange.bind(this)}>checkbox</CheckBox>
                </li>
                <li>
                    <h4>disabled</h4>
                    <CheckBox disabled="true">disabled checkbox</CheckBox>
                </li>
                <li>
                    <h4>checked checkbox</h4>
                    <CheckBox checked="true">checked checkbox</CheckBox>
                </li>
            </ol>
        );
    }
}
