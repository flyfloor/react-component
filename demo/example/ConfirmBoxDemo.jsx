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
                    </li>
                    <li>
                        <h4>Confirm box with custom action, text</h4>
                        <ConfirmBox content={<div><p>confirm? check the <a href="http://braavos.me" target="_blank">blog</a></p></div>} 
                            confirmBtn={confirmBtn} onConfirm={this.handleConfirm.bind(this)} 
                            cancelBtn={cancelBtn}
                            onCancel={this.handleCancel.bind(this)}>
                            <a href='javascript:;'>click</a>
                        </ConfirmBox>
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
                            </li>
                            <li>
                                <ConfirmBox content={contentNode} position='right'>
                                    <a href='javascript:;'>right</a>
                                </ConfirmBox>
                            </li>
                            <li>
                                <ConfirmBox content={contentNode} position='top'>
                                    <a href='javascript:;'>top</a>
                                </ConfirmBox>
                            </li>
                            <li>
                                <ConfirmBox content={contentNode} position='bottom'>
                                    <a href='javascript:;'>bottom</a>
                                </ConfirmBox>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Confirm box force to close</h4>
                        <ConfirmBox force={true} content={<p>force to close</p>}>
                            <a href="javascript:;">force to close</a>
                        </ConfirmBox>
                    </li>
                </ol>
            </div>
        );
    }
}
