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
                    </li>
                    <li>
                        <h4>Position</h4>
                        <ul>
                            <li>
                                <Message position='center' content={content}>
                                    <a href="javascript:;">center</a>
                                </Message>
                            </li>
                            <li>
                                <Message content={content} position='bottom' delay={2000}>
                                    <a href="javascript:;">bottom</a>
                                </Message>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>OnClose event</h4>
                        <Message content={content} closeNode={<span>关闭</span>} 
                            onClose={() => alert('message closed')}>
                            <a href="javascript:;">click</a>
                        </Message>
                    </li>
                </ol>
            </div>
        );
    }
}
