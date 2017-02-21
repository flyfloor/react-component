import React, { Component } from 'react';
import {FlashMessage} from './index';

const onClick = () => {
    alert('onClick')
    window.open('http://braavos.me')
}
const onClose = () => {
    return confirm('close?')
}

export default class FlashMessageDemo extends Component {
    showMessage(props){
        props.content = <p>this is the message</p>
        FlashMessage.show(props)
    }
    render() {
        return (
            <div>
                <h3>Message</h3>
                <ol>
                    <li>
                        <h4>Default message</h4>
                        <button onClick={this.showMessage.bind(this, {})}>click</button>
                        <pre>
                            <code>
{`
FlashMessage.show({
    content: <p>content</p>,
})
`}                           
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Position</h4>
                        <ul>
                            <li>
                                <button onClick={this.showMessage.bind(this, { position: 'top'})}>click</button>
                                <pre>
                                    <code>
{`
FlashMessage.show({
    content: <p>content</p>,
    position: 'top',
})
`}                                        
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <button onClick={this.showMessage.bind(this, { position: 'center'})}>click</button>
                                <pre>
                                    <code>
{`
FlashMessage.show({
    content: <p>content</p>,
    position: 'center',
})
`}                                           
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <button onClick={this.showMessage.bind(this, { position: 'bottom' })}>click</button>
                                <pre>
                                    <code>
{`
FlashMessage.show({
    content: <p>content</p>,
    position: 'bottom',
})
`}                                               
                                    </code>
                                </pre>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Delay time</h4>
                        <button onClick={this.showMessage.bind(this, { delay: 1000})}>click</button>
                        <pre>
                            <code>
{`
FlashMessage.show({
    content: <p>content</p>,
    delay: 1000,
})
`}                                      
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>custom close DOM</h4>
                        <button onClick={this.showMessage.bind(this, { close: <span>close</span> })}>click</button>
                        <pre>
                            <code>
{`
FlashMessage.show({
    content: <p>content</p>,
    close: <span>close</span>
})
`}                                         
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>onClick event</h4>
                        <button onClick={this.showMessage.bind(this, { onClick })}>click</button>
                        <pre>
                            <code>
{`
FlashMessage.show({
    content: <p>content</p>,
    onClick: clickFunction,
})
`}                                        
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
