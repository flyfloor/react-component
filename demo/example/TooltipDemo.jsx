import React from 'react';
import {Tooltip} from './index.js';

export default class TooltipDemo extends React.Component {
    render() {
        const contentNode = <p>Some basic component</p>;
        return (
            <div>
                <h3>Tooltip</h3>
                <ol>
                    <li>
                        <h4>Default tooltip</h4>
                        <Tooltip content={<p>Some component,build with ReactJs</p>}>
                            <button>hover</button>
                        </Tooltip>
                        <pre>
                            <code>
{`
<Tooltip content={<p>Some component,build with ReactJs</p>}>
    <button>hover</button>
</Tooltip>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Tooltip with different position</h4>
                        <ul>
                            <li>
                                <Tooltip content={<h2>huge text</h2>} position='left'>
                                    <div style={{'border': '1px solid #eee', 'padding': '20px', 'background': '#f8f8f8'}}>
                                        <h3>hover to show tooltip at left</h3>
                                        <p>this is the content</p>
                                    </div>
                                </Tooltip>
                                <pre>
                                    <code>
{`
<Tooltip content={<h2>huge text</h2>} position='left'>
    ...
</Tooltip>
`}                                            
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <Tooltip content={contentNode} position='right'>
                                    <button>hover</button>
                                </Tooltip>
                                <pre>
                                    <code>
{`
<Tooltip content={<h2>huge text</h2>} position='right'>
    ...
</Tooltip>
`}                                          
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <Tooltip content={contentNode} position='top'>
                                    <button>hover</button>
                                </Tooltip>
                                <pre>
                                    <code>
{`
<Tooltip content={<h2>huge text</h2>} position='top'>
    ...
</Tooltip>
`}                                          
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <Tooltip content={contentNode} position='bottom'>
                                    <button>hover</button>
                                </Tooltip>
                                <pre>
                                    <code>
{`
<Tooltip content={<h2>huge text</h2>} position='bottom'>
    ...
</Tooltip>
`}                                          
                                    </code>
                                </pre>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Click mode</h4>
                        <Tooltip content={contentNode} mode="click">
                            <button>click</button>
                        </Tooltip>
                        <pre>
                            <code>
{`
<Tooltip content={<h2>huge text</h2>} mode="click">
    ...
</Tooltip>
`}                                  
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
