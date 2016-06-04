import React from 'react';
import {Pin} from './index.js';

export default class PinDemo extends React.Component {

    render() {
        return (
            <div className='pin-demo'>
                <h3>Pin</h3>
                <ul>
                    <li>
                        <h4>Default pin</h4>
                        <Pin>
                            <div className='card'>
                                <h4>title</h4>
                                <p>pin at top</p>
                            </div>
                        </Pin>
                        <pre>
                            <code>
{`
<Pin>
    <div>
        <h4>title</h4>
        <p>pin at top</p>
    </div>
</Pin>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Pin with offset top</h4>
                        <Pin top={100}>
                            <div className='card'>
                                <h4>title</h4>
                                <p>pin at position top 100px</p>
                            </div>
                        </Pin>
                        <pre>
                            <code>
{`
<Pin top={100}>
    ...
</Pin>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Scroll to given top</h4>
                        <Pin begin={800}>
                            <div className="card last">
                                <h4>title</h4>
                                <p>pin when scroll to 800px</p>
                            </div>
                        </Pin>
                        <pre>
                            <code>
{`
<Pin begin={800}>
    ...
</Pin>
`}                                 
                            </code>
                        </pre>
                    </li>
                </ul>
                <h3 style={{'textAlign': 'center'}}>↓↓ Scroll to bottom ↓↓</h3>
            </div>
        );
    }
}
