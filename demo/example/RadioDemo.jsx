import React from 'react';
import {Radio} from './index.js';

export default class RadioDemo extends React.Component {
    handleChange(e){
        
    }

    render() {
        return (
            <div>
                <h3>Radio</h3>
                <ul>
                    <li>
                        <h4>Default radio</h4>
                        <Radio onChange={this.handleChange.bind(this)}>radio</Radio>
                        <pre>
                            <code>
                                {`<Radio onChange={handleChange}>radio</Radio>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Checked radio</h4>
                        <Radio checked={true}>checked</Radio>
                        <pre>
                            <code>
                                {`<Radio checked={true}>checked</Radio>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Disabled radio</h4>
                        <Radio disabled={true}>disabled</Radio>
                        <pre>
                            <code>
                                {`<Radio disabled={true}>disabled</Radio>`}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
