import React from 'react';
import {Tab} from './index.js';

export default class TabDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index1: 1,
        };
    }
    displayChange(index){
        this.setState({
            index: index 
        });
    }

    render() {
        return (
            <div>
                <h3>Tab</h3>
                <ul className="two">
                    <li>
                        <h4>Default tab</h4>
                        <p>you selected item index is {this.state.index}</p>
                        <Tab onSelect={this.displayChange.bind(this)} selectedIndex={this.state.index}>
                            <a href="javascript:;">first</a>
                            <a href="javascript:;">second</a>
                            <a target='_blank' href="http://braavos.me">third</a>
                            <a href="javascript:;">
                                fourth <i>:)</i>
                            </a>
                        </Tab>
                    </li>
                    <li>
                        <h4>Tab with given index</h4>
                        <Tab selectedIndex={this.state.index1}>
                            <a href="javascript:;">first</a>
                            <a href="javascript:;">second</a>
                            <a target='_blank' href="http://braavos.me">third</a>
                            <a href="javascript:;">
                                fourth <i>:)</i>
                            </a>
                        </Tab>
                    </li>
                </ul>
            </div>
        );
    }
}
