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
                <li>
                    <h4>Tab with position</h4>
                    <ol>
                        <li>
                            <h5>bottom(default)</h5>
                            <Tab position="bottom">
                                <a href="javascript:;">first</a>
                                <a href="javascript:;">second</a>
                                <a target='_blank' href="http://braavos.me">third</a>
                                <a href="javascript:;">
                                    fourth <i>:)</i>
                                </a>
                            </Tab>
                            <br/>
                        </li>
                        <li>
                            <h5>top</h5>
                            <Tab position="top">
                                <a href="javascript:;">first</a>
                                <a href="javascript:;">second</a>
                                <a target='_blank' href="http://braavos.me">third</a>
                                <a href="javascript:;">
                                    fourth <i>:)</i>
                                </a>
                            </Tab>
                            <br/>
                        </li>
                        <li>
                            <h5>left</h5>
                            <div style={{'width':'200px'}}>
                                <Tab position="left">
                                    <a href="javascript:;">first</a>
                                    <a href="javascript:;">second</a>
                                    <a target='_blank' href="http://braavos.me">third</a>
                                    <a href="javascript:;">
                                        fourth <i>:)</i>
                                    </a>
                                </Tab>
                                <br/>
                            </div>
                        </li>
                        <li>
                            <h5>right</h5>
                            <div style={{'width':'200px'}}>
                                <Tab position="right">
                                    <a href="javascript:;">first</a>
                                    <a href="javascript:;">second</a>
                                    <a target='_blank' href="http://braavos.me">third</a>
                                    <a href="javascript:;">
                                        fourth <i>:)</i>
                                    </a>
                                </Tab>
                                <br/>
                            </div>
                        </li>
                    </ol>
                </li>
            </ul>
        );
    }
}
