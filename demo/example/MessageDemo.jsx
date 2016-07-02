import React, { Component } from 'react';
import {Message} from './index';

export default class MessageDemo extends Component {
    render() {
        const content = <p>this is the message</p>;
        return (
            <div>
                <h3>Message</h3>
                <ol>
                    <li>
                        <h4>Default message</h4>
                        <Message content={content}>
                            <button>click</button>
                        </Message>
                        <pre>
                            <code>
{`
<Message content={<p>message</p>}>
    <button>click</button>
</Message>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Position</h4>
                        <ul>
                            <li>
                                <Message position='center' content={content}>
                                    <button>center</button>
                                </Message>
                                <pre>
                                    <code>
{`
<Message position='center' content={<p>message</p>}>
    <button>center</button>
</Message>
`}                                        
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <Message content={content} position='bottom' delay={2000}>
                                    <button>bottom</button>
                                </Message>
                                <pre>
                                    <code>
{`
<Message position='bottom' content={<p>message</p>} delay={2000}>
    <button>bottom</button>
</Message>
`}                                             
                                    </code>
                                </pre>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Delay time</h4>
                        <Message content={content} delay={2000}>
                            <button>delay</button>
                        </Message>
                        <pre>
                            <code>
{`
<Message content={content} delay={2000}>
    <button>delay</button>
</Message>
`}                                   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>OnClose event</h4>
                        <Message content={content} closeNode={<span>关闭</span>} 
                            onClose={() => alert('message closed')}>
                            <button>click</button>
                        </Message>
                        <pre>
                            <code>
{`
<Message closeNode={<span>关闭</span>} content={<p>message</p>}
    onClose={onClose}>
    <button>center</button>
</Message>
`}                                     
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
