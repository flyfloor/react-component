import React from 'react';

import {Menu} from './index.js';

export default class MenuDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 1,
            index1: 0,
        }
    }
    displayChange(index){
        this.setState({
            index: index 
        });
    }

    render() {
        const items  =  <div>
                            <Menu.Item key='0'>
                                <a href="javascript:;">one</a>
                            </Menu.Item>
                            <Menu.Item key='1'>
                                <a href="javascript:;">two</a>
                            </Menu.Item>
                            <Menu.Item key='2'>
                                <a href="javascript:;">three</a>
                            </Menu.Item>
                            <Menu.Item key='3'>
                                <a href="javascript:;">
                                    four
                                    <i>^_^</i>
                                </a>
                            </Menu.Item>
                        </div>;

        const onNode = <a href="javascript:;">close menu</a>;

        return (
            <ol>
                <li>
                    <h4>menu, default with mouse hover</h4>
                    <p>you selected item index is {this.state.index}</p>
                    <Menu onSelect={this.displayChange.bind(this)} selectedIndex={this.state.index} items={items} triggerOn={onNode}>
                        <a href="javascript:;">show menu</a>
                    </Menu>
                </li>
                <li>
                    <h4>menu, with click to trigger menu open</h4>
                    <Menu selectedIndex={this.state.index1} items={items} triggerOn={onNode} triggerType='click'>
                        <a href="javascript:;">show menu</a>
                    </Menu>
                </li>
            </ol>
        );
    }
}
