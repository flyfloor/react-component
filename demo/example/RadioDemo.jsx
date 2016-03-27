import React from 'react';
import {Radio} from './index.js';

export default class RadioDemo extends React.Component {
    handleChange(e){
        
    }

    render() {
        return (
            <div>
                <h3>Radio</h3>
                <ul className="three">
                    <li>
                        <h4>Default radio</h4>
                        <Radio onChange={this.handleChange.bind(this)}>radio</Radio>
                    </li>
                    <li>
                        <h4>Checked radio</h4>
                        <Radio checked={true}>checked radio</Radio>
                    </li>
                    <li>
                        <h4>Disabled radio</h4>
                        <Radio disabled={true}>disabled radio</Radio>
                    </li>
                </ul>
            </div>
        );
    }
}
