import css from './pin_demo.less';
import React from 'react';
import {Pin} from './index.js';

export default class PinDemo extends React.Component {

    render() {
        return (
            <div style={{'height':'1500'}} className='pin-demo'>
                <ol>
                    <li>
                        <h4>pin something</h4>
                        <Pin>
                            <div className='card'>
                                <h4>title</h4>
                                <p>pin at top</p>
                            </div>
                        </Pin>
                    </li>
                    <li>
                        <h4>pin with offset</h4>
                        <Pin top='200'>
                            <div className='card'>
                                <h4>title</h4>
                                <p>pin at position top 200</p>
                            </div>
                        </Pin>
                    </li>
                </ol>
            </div>
        );
    }
}
