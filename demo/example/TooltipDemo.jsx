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
                            <a href='javascript:;'>hover</a>
                        </Tooltip>
                    </li>
                    <li>
                        <h4>Tooltip with different position</h4>
                        <ul>
                            <li>
                                <Tooltip content={<h2>huge text</h2>} position='left'>
                                    <div style={{'border': '1px solid #eee', 'padding': '20', 'background': '#f8f8f8'}}>
                                        <h3>hover to show tooltip at left</h3>
                                        <p>this is the content</p>
                                    </div>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content={contentNode} position='right'>
                                    <a href='javascript:;'>right</a>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content={contentNode} position='top'>
                                    <a href='javascript:;'>top</a>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content={contentNode} position='bottom'>
                                    <a href='javascript:;'>bottom</a>
                                </Tooltip>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Click mode</h4>
                        <Tooltip content={contentNode} mode="click">
                            <a href='javascript:;'>click</a>
                        </Tooltip>
                    </li>
                </ol>
            </div>
        );
    }
}
