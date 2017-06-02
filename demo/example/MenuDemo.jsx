import React, { Component } from 'react';
import {Menu, MenuItem, SubMenu, MenuGroup} from './index.js';

export default class MenuDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: "item1.1",
        };
    }

    render(){
        return (
            <Menu>
                <SubMenu title={<div>sub menu 0</div>}>
                    <MenuGroup title={<div>group 1</div>}>
                        <MenuItem index="item1.1">
                            <p>item 1-1</p>
                        </MenuItem>
                        <MenuItem index="item1.2">
                            <p>item 1-2</p>
                        </MenuItem>
                    </MenuGroup>
                    <MenuGroup title={<div>group 2</div>}>
                        <MenuItem index="item2.1">
                            <p>item 2-1</p>
                        </MenuItem>
                        <MenuItem index="item2.2" disabled>
                            <p>item 2</p>
                        </MenuItem>
                    </MenuGroup>
                </SubMenu>
                <MenuItem index="item3">
                    <p>item 3</p>
                </MenuItem>
                <SubMenu title={<p>sub menu 1</p>}>
                    <MenuItem index="item4">
                        <p>item 4</p>
                    </MenuItem>
                    <MenuItem index="item5">
                        <p>item 5</p>
                    </MenuItem>
                    <SubMenu title={<p>third menu</p>}>
                        <MenuGroup title={<div>group 3</div>}>
                            <MenuItem index="item6">
                                <p>item 6</p>
                            </MenuItem>
                        </MenuGroup>
                        <MenuItem index="item7">
                            <p>item 7</p>
                        </MenuItem>
                    </SubMenu>
                    <MenuGroup title={<p>group 4</p>}>
                        <MenuItem index="item8">
                            <p>item 8</p>
                        </MenuItem>
                        <MenuItem index="item9">
                            <p>item 9</p>
                        </MenuItem>
                    </MenuGroup>
                </SubMenu>
            </Menu>
        )
    }
}
