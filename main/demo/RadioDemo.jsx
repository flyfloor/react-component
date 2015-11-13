import React from 'react';
import {Radio} from './index.js';

export default class RadioDemo extends React.Component {
    handleChange(e){
        console.log(e.target.checked);
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>radio</h4>
                    <Radio onChange={this.handleChange.bind(this)}>radio</Radio>
                </li>
                <li>
                    <h4>disabled</h4>
                    <Radio disabled="true">disabled radio</Radio>
                </li>
                <li>
                    <h4>checked radio</h4>
                    <Radio checked="true">checked radio</Radio>
                </li>
            </ol>
        );
    }
}
