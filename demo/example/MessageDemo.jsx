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
                            <a href="javascript:;">click</a>
                        </Message>
                        <pre>
                            <code>
{`
<Message content={<p>message</p>}>
    <a href="javascript:;">click</a>
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
                                    <a href="javascript:;">center</a>
                                </Message>
                                <pre>
                                    <code>
{`
<Message position='center' content={<p>message</p>}>
    <a href="javascript:;">center</a>
</Message>
`}                                        
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <Message content={content} position='bottom' delay={2000}>
                                    <a href="javascript:;">bottom</a>
                                </Message>
                                <pre>
                                    <code>
{`
<Message position='bottom' content={<p>message</p>} delay={2000}>
    <a href="javascript:;">bottom</a>
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
                            <a href="javascript:;">delay</a>
                        </Message>
                        <pre>
                            <code>
{`
<Message content={content} delay={2000}>
    <a href="javascript:;">delay</a>
</Message>
`}                                   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>OnClose event</h4>
                        <Message content={content} closeNode={<span>关闭</span>} 
                            onClose={() => alert('message closed')}>
                            <a href="javascript:;">click</a>
                        </Message>
                        <pre>
                            <code>
{`
<Message closeNode={<span>关闭</span>} content={<p>message</p>}
    onClose={onClose}>
    <a href="javascript:;">center</a>
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
