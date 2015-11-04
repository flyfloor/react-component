import React from 'react';

import {Tooltip} from './index.js';

export default class TooltipDemo extends React.Component {
    render() {
        return (
            <ol>
                <li>
                    <h4>default confirm box</h4>
                    <Tooltip title='confirm deleted, realy you want delete this? are you sure?'>
                        <a href='javascript:;'>delete</a>
                    </Tooltip>
                </li>
                <li>
                    <h4>conform box with different position</h4>
                    <ul>
                        <li>
                            <Tooltip title='confirm delete?' position='left'>
                                <a href='javascript:;'>left</a>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip title='confirm delete?' position='right'>
                                <a href='javascript:;'>right</a>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip title='confirm delete?' position='top'>
                                <a href='javascript:;'>top</a>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip title='confirm delete?' position='bottom'>
                                <a href='javascript:;'>bottom</a>
                            </Tooltip>
                        </li>
                    </ul>
                </li>
            </ol>
        );
    }
}
