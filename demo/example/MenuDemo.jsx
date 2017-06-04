import React, { Component } from 'react';
import {Menu, MenuItem, SubMenu, MenuGroup} from './index.js';

const generateMenu = (props) => {
    return (
        <Menu {...props}>
            <SubMenu title={<div>sub menu 0</div>} active>
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
                <SubMenu title={<p>third menu 0</p>}>
                    <MenuItem index="item1.1.1">
                        <p>item 1-1-1</p>
                    </MenuItem>
                    <MenuItem index="item1.1.2">
                        <p>item 1-1-2</p>
                    </MenuItem>
                </SubMenu>
                <SubMenu title={<p>third menu 2</p>}>
                    <MenuItem index="item1.2.1">
                        <p>item 1-2-1</p>
                    </MenuItem>
                    <MenuItem index="item1.2.2">
                        <p>item 1-2-2</p>
                    </MenuItem>
                </SubMenu>
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
                <MenuGroup title={<p>group 4</p>}>
                    <MenuItem index="item8">
                        <p>item 8</p>
                    </MenuItem>
                    <MenuItem index="item9">
                        <p>item 9</p>
                    </MenuItem>
                </MenuGroup>
                <SubMenu title={<p>third menu</p>} active>
                    <MenuItem index="item6">
                        <p>item 6</p>
                    </MenuItem>
                    <MenuGroup title={<div>group 3</div>}>
                        <MenuItem index="item7">
                            <p>item 7</p>
                        </MenuItem>
                    </MenuGroup>
                </SubMenu>
            </SubMenu>
        </Menu>
    )
}

export default class MenuDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            current: "item1.1",
        };
    }

    render(){
        return (
            <ul>
                {/*<li>
                    <h3>Default menu</h3>
                    <br/>
                    {generateMenu()}
                    <br/>
                    <br/>
                </li>
                <li>
                    <h3>Menu with given current selected</h3>
                    <br/>
                    {generateMenu({current: this.state.current})}
                    <br/>
                    <br/>
                </li>
                <li>
                    <h3>Menu with onChange event</h3>
                    <br/>
                    {generateMenu({
                        onChange: value => alert(`selected menu item index is ${value}`)
                    })}
                    <br/>
                    <br/>
                </li>
                <li>
                    <h3>Accordion menu</h3>
                    <br/>
                    {generateMenu({ mode: 'accordion'})}
                    <br/>
                    <br/>
                </li>*/}
                <li>
                    <h3>Horizontal menu</h3>
                    <br/>
                    {generateMenu({ mode: 'horizontal'})}
                    <br/>
                    <br/>
                    <br/>
                    {generateMenu({ mode: 'horizontal'})}
                    <br/>
                </li>
            </ul>
        )
    }
}
