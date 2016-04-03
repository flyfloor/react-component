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
        const contentNode = <p>Confrim delete?</p>;
        const confirmBtn = <h3>√ yes</h3>
        const cancelBtn = <p style={{'color': '#777'}}>cancel</p>;
        return (
            <div>
                <h3>Confirm box</h3>
                <ol>
                    <li>
                        <h4>Default confirm box</h4>
                        <ConfirmBox content={contentNode}>
                            <a href='javascript:;'>delete</a>
                        </ConfirmBox>
                    </li>
                    <li>
                        <h4>Confirm box with custom action, text</h4>
                        <ConfirmBox content={<p>delete this? are you sure?</p>} 
                            confirmBtn={confirmBtn} onConfirm={this.handleConfirm.bind(this)} 
                            cancelBtn={cancelBtn}
                            onCancel={this.handleCancel.bind(this)}>
                            <a href='javascript:;'>delete</a>
                        </ConfirmBox>
                    </li>
                    <li>
                        <h4>Confirm box with different position</h4>
                        <ul>
                            <li>
                                <ConfirmBox content={<h2>Huge text</h2>} position='left'>
                                    <a href='javascript:;'>left</a>
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
