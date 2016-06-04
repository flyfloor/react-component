import React from 'react';
import {ConfirmBox} from './index.js';

export default class ConfirmBoxDemo extends React.Component {
    handleConfirm(){
        return confirm('confirm?');
    }

    handleCancel(){
        return true;
    }

    render() {
        const contentNode = <p>Confrim this?</p>;
        const confirmBtn = <h3>√ yes</h3>
        const cancelBtn = <p style={{'color': '#777'}}>cancel</p>;
        return (
            <div>
                <h3>Confirm box</h3>
                <ol>
                    <li>
                        <h4>Default confirm box</h4>
                        <ConfirmBox content={contentNode}>
                            <a href='javascript:;'>click</a>
                        </ConfirmBox>
                        <pre>
                            <code>
                                {'<ConfirmBox content={<div><h1>title</h1><p>content</p></div>}>'}
                                <br/>
                                {'  <a href="#">click</a>'}
                                <br/>
                                {'</ConfirmBox>'}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Confirm box with custom action, text</h4>
                        <ConfirmBox content={<div><p>confirm? check the <a href="http://braavos.me" target="_blank">blog</a></p></div>} 
                            confirmBtn={confirmBtn} onConfirm={this.handleConfirm.bind(this)} 
                            cancelBtn={cancelBtn}
                            onCancel={this.handleCancel.bind(this)}>
                            <a href='javascript:;'>click</a>
                        </ConfirmBox>
                        <pre>
                            <code>
{`
<ConfirmBox content={<div>
        <p>confirm? check the <a href="http://braavos.me" target="_blank">blog</a></p>
        </div>} 
    confirmBtn={confirmBtn} onConfirm={handleConfirm} 
    cancelBtn={cancelBtn}
    onCancel={handleCancel}>
    <a href="#">click</a>
</ConfirmBox>
`}                        
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Confirm box with different position</h4>
                        <ul>
                            <li>
                                <ConfirmBox content={<h2>Huge text</h2>} position='left'>
                                    <div style={{'border': '1px solid #eee', 'padding': '20', 'background': '#f8f8f8'}}>
                                        <h3>click to show confirm at left</h3>
                                        <p>this is the content</p>
                                    </div>
                                </ConfirmBox>
                                <pre>
                                    <code>
{`<ConfirmBox content={<h2>Huge text</h2>} position='left'>
    <div style={{
        'border': '1px solid #eee', 
        'padding': '20', 
        'background': '#f8f8f8'}}>
        <h3>click to show confirm at left</h3>
        <p>this is the content</p>
    </div>
</ConfirmBox>
`}
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <ConfirmBox content={contentNode} position='right'>
                                    <a href='javascript:;'>right</a>
                                </ConfirmBox>
                                <pre>
                                    <code>
{`
<ConfirmBox content={<h>text</h>} position='right'>
    <a href="#">right</a>
</ConfirmBox>
`}
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <ConfirmBox content={contentNode} position='top'>
                                    <a href='javascript:;'>top</a>
                                </ConfirmBox>
                                <pre>
                                    <code>
{`
<ConfirmBox content={<h>text</h>} position='top'>
    <a href="#">right</a>
</ConfirmBox>
`}                                
                                    </code>
                                </pre>
                            </li>
                            <li>
                                <ConfirmBox content={contentNode} position='bottom'>
                                    <a href='javascript:;'>bottom</a>
                                </ConfirmBox>
                                <pre>
                                    <code>
{`
<ConfirmBox content={<h>text</h>} position='bottom'>
    <a href="#">right</a>
</ConfirmBox>
`}                                
                                    </code>
                                </pre>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Confirm box force to close</h4>
                        <ConfirmBox force={true} content={<p>force to close</p>}>
                            <a href="javascript:;">force to close</a>
                        </ConfirmBox>
                        <pre>
                            <code>
{`
    <ConfirmBox force={true} content={<p>force to close</p>}>
        <a href="#">force to close</a>
    </ConfirmBox>
`}                               
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
