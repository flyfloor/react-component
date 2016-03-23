import css from './pin_demo.less';
import React from 'react';
import {Pin} from './index.js';

export default class PinDemo extends React.Component {

    render() {
        return (
            <div className='pin-demo'>
                <ul className="two">
                    <li>
                        <h4>Default pin</h4>
                        <Pin>
                            <div className='card'>
                                <h4>title</h4>
                                <p>pin at top</p>
                            </div>
                        </Pin>
                    </li>
                    <li>
                        <h4>Pin with offset top</h4>
                        <Pin top={100}>
                            <div className='card'>
                                <h4>title</h4>
                                <p>pin at position top 100</p>
                            </div>
                        </Pin>
                    </li>
                </ul>
            </div>
        );
    }
}
