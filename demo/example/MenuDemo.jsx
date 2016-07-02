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
        this.setState({
            index: index 
        });
    }

    formatChild({current, accordion=false, onChange, style, popped=false, mode='click', horizontal=false, activeFirst=false}) {
        return <Menu current={current} accordion={accordion} onChange={onChange} horizontal={horizontal} style={style} popped={popped} mode={mode}>
                    <Item index='sub0' sub={true} active={activeFirst} title={<p>Sub Menu</p>}>
                        <Menu className="second-menu">
                            <Item index="0">
                                <p>Sub item</p>
                            </Item>
                            <Item index="1">
                                <p>Sub item</p>
                            </Item>
                            <Item index="2" disabled={true}>
                                <p>Sub item</p>
                            </Item>
                            <Item sub={true} index="sub0_1" title={<p>Third Menu</p>}>
                                <Menu className="third-menu">
                                    <Item index="10">
                                        <p>Third item</p>
                                    </Item>
                                    <Item index="11">
                                        <p>Third item</p>
                                    </Item>
                                </Menu>
                            </Item>
                        </Menu>
                    </Item>
                    <Item index="sub1" sub={true} title={<p>Sub Menu</p>}>
                        <Menu className="second-menu">
                            <Item index="sub1_0" sub={true} title={<p>Third Menu</p>}>
                                <Menu className="third-menu">
                                    <Item index="6" disabled={true}>
                                        <p>Third item</p>
                                    </Item>
                                    <Item index="7">
                                        <p>Third item</p>
                                    </Item>
                                </Menu>
                            </Item>
                            <Item index="sub1_1" sub={true} title={<p>Third Menu</p>}>
                                <Menu className="third-menu">
                                    <Item index="8">
                                        <p>Third item</p>
                                    </Item>
                                    <Item index="9">
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
                </Menu>;
    }

    render() {

        const style = {
            'width': '200px'
        }

        return (
            <div id="menu_demo">
                <h3>Menu</h3>
                <ul>
                    <li>
                        <h4>Default menu</h4>
                        <p>you selected item index is {this.state.index}</p>
                        {this.formatChild({current: this.state.index, onChange: this.displayChange.bind(this), style, activeFirst: true })}
                        <pre>
                            <code>
{`
<Menu current={current} onChange={onChange}>
    <Item index='sub0' sub={true} active={activeFirst} title={<p>Sub Menu</p>}>
        <Menu className="second-menu">
            <Item index="0">
                <p>Sub item</p>
            </Item>
            ...
            <Item sub={true} index="sub0_1" title={<p>Third Menu</p>}>
                <Menu className="third-menu">
                    <Item index="10">
                        <p>Third item</p>
                    </Item>
                    ...
                </Menu>
            </Item>
        </Menu>
    </Item>
    ...
    <Item index="4">
        <p>Item <a target="_blank" href="http://braavos.me" style={{'color': '#f00'}}>blog</a></p>
    </Item>
</Menu>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Accordion menu </h4>
                        <p>only show one menu at a atime, accordion</p>
                        {this.formatChild({ accordion: true, style})}
                        <pre>
                            <code>
{`
<Menu current={current} accordion={true}>
    ...
</Menu>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Popped out menu</h4>
                        {this.formatChild({ popped: true, style })}
                        <pre>
                            <code>
{`
<Menu current={current} popped={true}>
    ...
</Menu>
`} 
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Hover mode menu</h4>
                        {this.formatChild({ mode: 'hover', popped: true, style })}
                        <pre>
                            <code>
{`
<Menu current={current} popped={true} mode="hover">
    ...
</Menu>
`}                             
                            </code>
                        </pre>                        
                    </li>
                    <li>
                        <h4>Horizontal menu</h4>
                        {this.formatChild({horizontal: true})}
                        <pre>
                            <code>
{`
<Menu current={current} horizontal={true}>
    ...
</Menu>
`}                                 
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
