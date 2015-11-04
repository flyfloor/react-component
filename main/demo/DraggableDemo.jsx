import React from 'react';

import {Draggable} from './index.js';

export default class DraggableDemo extends React.Component {
    render() {
        return (
            <div className="draggable-demo">
                <ol>
                    <li>
                        <h4>box can drag</h4>
                        <Draggable>
                            <div className='card'>
                                <h4>title</h4>
                                <p>content contefjaiwefjiweajojilsjfl</p>
                            </div>
                        </Draggable>
                    </li>
                    <li>
                        <h4>another drag box</h4>
                        <Draggable>
                            <div className='card'>
                                <h4>xxxxx</h4>
                                <p>content afawfawfawfwaefawf</p>
                            </div>
                        </Draggable>
                    </li>
                </ol>
            </div>
        );
    }
}
