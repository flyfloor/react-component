import React from 'react';
import {Menu, Item} from './index.js';

export default class MenuDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: "1",
        };
    }
    displayChange(index){
        console.log(index);
        this.setState({
            index: index 
        });
    }

    render() {
        const items = <div>
                        <a href="javascript:;">one</a>
                        <a href="javascript:;">two</a>
                        <a href="javascript:;">three</a>
                        <a href="javascript:;">
                            four <i> : )</i>
                        </a>
                    </div>;

        const onNode = <a href="javascript:;">close menu</a>;

        return (
            <div>
                <h3>Menu</h3>
                <ul className="two">
                    <li>
                        <h4>Default menu</h4>
                        <p>you selected item index is {this.state.index}</p>
                        <Menu current={this.state.index} style={{'width': '200'}} mutex={true} onSelect={this.displayChange.bind(this)}>
                            <Item index='sub0' sub={true} title={<p>Sub Menu</p>}>
                                <Menu className="second-menu">
                                    <Item index="0">
                                        <p>Sub item</p>
                                    </Item>
                                    <Item index="1">
                                        <p>Sub item</p>
                                    </Item>
                                    <Item index="2">
                                        <p>Sub item</p>
                                    </Item>
                                </Menu>
                            </Item>
                            <Item index="sub1" sub={true} title={<p>Sub Menu 1</p>}>
                                <Menu className="second-menu">
                                    <Item index="3" sub={true} title={<p>Third Menu</p>}>
                                        <Menu className="third-menu">
                                            <Item index="6">
                                                <p>Third item</p>
                                            </Item>
                                        </Menu>
                                    </Item>
                                    <Item index="5">
                                        <p>Sub item</p>
                                    </Item>
                                </Menu>
                            </Item>
                            <Item index="4">
                                <p>Item <a target="_blank" href="http://braavos.me" style={{'color': '#f00'}}>blog</a></p>
                            </Item>
                        </Menu>
                       {/* <Menu onSelect={this.displayChange.bind(this)} selectedIndex={this.state.index} items={items} triggerOn={onNode}>
                            <a href="javascript:;">show menu</a>
                        </Menu>*/}
                    </li>
                    {/*<li>
                        <h4>Menu, click to trigger</h4>
                        <Menu selectedIndex={this.state.index1} items={items} triggerOn={onNode} triggerType='click'>
                            <a href="javascript:;">show menu</a>
                        </Menu>
                    </li>*/}
                </ul>
            </div>
        );
    }
}
