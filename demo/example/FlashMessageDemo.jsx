import React, { Component } from 'react';
import {FlashMessage} from './index';

export default class FlashMessageDemo extends Component {
    render() {
        const content = <p>this is the message</p>;
        return (
            <div>
                <h3>Message</h3>
                <ol>
                    <li>
                        <h4>Default message</h4>
                        <button onClick={() => this.refs.fm0.open()}>click</button>
                        <FlashMessage ref="fm0">
                            {content}
                        </FlashMessage>
                        <pre>
                            <code>
{`
<button onClick={() => this.refs.fm.open()}>click</button>
<FlashMessage ref="fm">
    ...
</FlashMessage>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Position</h4>
                        <ul>
                            <li>
                                <button onClick={() => this.refs.fm1.open()}>click</button>
                                <FlashMessage position='center' ref="fm1">
                                    {content}
                                </FlashMessage>
                                <pre>
                                    <code>
{`
<button onClick={() => this.refs.fm.open()}>click</button>
<FlashMessage ref="fm" position="center">
    ...
</FlashMessage>
`}                                        
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <button onClick={() => this.refs.fm2.open()}>click</button>
                                <FlashMessage position='center' ref="fm2">
                                    {content}
                                </FlashMessage>
                                <pre>
                                    <code>
{`
<button onClick={() => this.refs.fm.open()}>click</button>
<FlashMessage ref="fm" position="bottom">
    ...
</FlashMessage>
`}                                           
                                    </code>
                                </pre>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Delay time</h4>
                        <button onClick={() => this.refs.fm3.open()}>click</button>
                        <FlashMessage ref="fm3" delay={2000}>
                            {content}
                        </FlashMessage>
                        <pre>
                            <code>
{`
<button onClick={() => this.refs.fm.open()}>click</button>
<FlashMessage ref="fm" delay={2000}>
    ...
</FlashMessage>
`}                                   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>onClose event</h4>
                        <button onClick={() => this.refs.fm4.open()}>click</button>
                        <FlashMessage ref="fm4" close={<span>关闭</span>} 
                            onClose={() => alert('message closed')}>
                            {content}
                        </FlashMessage>
                        <pre>
                            <code>
{`
<button onClick={() => this.refs.fm.open()}>click</button>
<FlashMessage ref="fm" close={<span>关闭</span>} onClose={onClose}>
    ...
</FlashMessage>
`}                                     
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
