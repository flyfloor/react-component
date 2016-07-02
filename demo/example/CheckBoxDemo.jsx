import React from 'react';
import {CheckBox} from "./index.js";

export default class CheckBoxDemo extends React.Component {
    handleChange(e){
        console.log('changed', e.target.checked);
    }
    render() {
        return (
            <div>
                <h3>Checkbox</h3>
                <ul>
                    <li>
                        <h4>Default checkbox</h4>
                        <CheckBox onChange={this.handleChange.bind(this)}>checkbox</CheckBox>
                        <pre>
                            <code>
                                {'<CheckBox onChange={handleChange}>\n\tcheckbox\n</CheckBox>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Checked checkbox</h4>
                        <CheckBox checked={true}>checked</CheckBox>
                        <pre>
                            <code>
                                {'<CheckBox checked={true}>checked</CheckBox>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Disabled checkbox</h4>
                        <CheckBox disabled={true}>disabled</CheckBox>
                        <pre>
                            <code>
                                {'<CheckBox disabled={true}>disabled</CheckBox>'}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
