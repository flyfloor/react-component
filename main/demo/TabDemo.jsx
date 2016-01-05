import React from 'react';
import {Tab} from './index.js';

export default class TabDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index1: 1,
        }
    }
    displayChange(index){
        this.setState({
            index: index 
        });
    }

    render() {
        const items  =  <div>
                            <a href="javascript:;">first</a>
                            <a href="javascript:;">second</a>
                            <a target='_blank' href="http://braavos.me">third</a>
                            <a href="javascript:;">
                                fourth
                                <i>^_^</i>
                            </a>
                        </div>;


        return (
            <ul className="two">
                <li>
                    <h4>Default tab</h4>
                    <p>you selected item index is {this.state.index}</p>
                    <Tab onSelect={this.displayChange.bind(this)} selectedIndex={this.state.index} items={items}/>
                </li>
                <li>
                    <h4>Tab with given index</h4>
                    <Tab selectedIndex={this.state.index1} items={items}/>
                </li>
                <li>
                    <h4>Tab with position</h4>
                    <ol>
                        <li>
                            <h5>bottom(default)</h5>
                            <Tab items={items} position='bottom'/>
                            <br/>
                        </li>
                        <li>
                            <h5>top</h5>
                            <Tab items={items} position='top'/>
                            <br/>
                        </li>
                        <li>
                            <h5>left</h5>
                            <div style={{'width':'200px'}}>
                                <Tab items={items} position='left'/>
                                <br/>
                            </div>
                        </li>
                        <li>
                            <h5>right</h5>
                            <div style={{'width':'200px'}}>
                                <Tab items={items} position='right'/>
                                <br/>
                            </div>
                        </li>
                    </ol>
                </li>
            </ul>
        );
    }
}
