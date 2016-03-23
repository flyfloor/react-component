import React from 'react';
import {Tooltip} from './index.js';

export default class TooltipDemo extends React.Component {
    render() {
        const contentNode = <p>Some basic component</p>;
        return (
            <ol>
                <li>
                    <h4>Default tooltip</h4>
                    <Tooltip content={<p>Some basic component,barely no css, build with ReactJs</p>}>
                        <a href='javascript:;'>click</a>
                    </Tooltip>
                </li>
                <li>
                    <h4>Tooltip with different position</h4>
                    <ul>
                        <li>
                            <Tooltip content={<h2>huge text</h2>} position='left'>
                                <a href='javascript:;'>left</a>
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
            </ol>
        );
    }
}
