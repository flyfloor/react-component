import React from 'react';
import {Tab, Item} from './index.js';

export default class TabDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: '2',
        };
    }
    displayChange(index){
        this.setState({
            index 
        });
    }

    formatTab({current=null, onChange=null}){
        return (
            <Tab onChange={onChange} current={current} style={{'width': '350px'}}>
                <Item index='0' title={<p>first</p>}>
                    <h4>The first tab content</h4>
                    <p>React.js is pretty awesome</p>
                </Item>
                <Item index='1' title={<p>second</p>}>
                    <h4>The second tab content</h4>
                    <p>Vue.js is pretty awesome</p>
                </Item>
                <Item index='2' title={<p>third</p>}>
                    <h4>The third tab content</h4>
                    <p>Ember.js is pretty awesome</p>
                    <Tab>
                        <Item index='4' title={<p>first</p>}>
                            <h4>The first tab content</h4>
                            <p>React.js is pretty awesome</p>
                        </Item>
                        <Item index='5' title={<p>second</p>}>
                            <h4>The second tab content</h4>
                            <p>Vue.js is pretty awesome</p>
                        </Item>
                        <Item index='6' title={<p>third</p>}>
                            <h4>The third tab content</h4>
                            <p>Ember.js is pretty awesome</p>
                        </Item>
                        <Item index='7' title={<p>fourth</p>}>
                            <h4>The fourth tab content</h4>
                            <p>Angular.js is pretty awesome</p>
                            <a target='_blank' href="http://braavos.me">blog</a>
                        </Item>
                    </Tab>
                </Item>
                <Item index='3' title={<p>fourth</p>}>
                    <h4>The fourth tab content</h4>
                    <p>Angular.js is pretty awesome</p>
                    <a target='_blank' href="http://braavos.me">blog</a>
                </Item>
            </Tab>
        );
    }

    render() {
        return (
            <div>
                <h3>Tab</h3>
                <ul>
                    <li>
                        <h4>Default tab</h4>
                        <p>this will change next tab</p>
                        {this.formatTab({ onChange: this.displayChange.bind(this)})}
                        <pre>
                            <code>
{`
    <Tab onChange={onChange}>
        <Item index='0' title={<p>first</p>}>
            <h4>The first tab content</h4>
        </Item>
        ...
        <Item index='2' title={<p>third</p>}>
            <h4>The third tab content</h4>
            <Tab>
                <Item index='4' title={<p>first</p>}>
                    <p>React.js is pretty awesome</p>
                </Item>
                ...
            </Tab>
        </Item>
    </Tab>
`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Tab with given current tab</h4>
                        <p>your selected tab is {this.state.index}</p>
                        {this.formatTab({current: this.state.index, onChange: this.displayChange.bind(this) })}
                        <pre>
                            <code>
{`
    <Tab current={current} onChange={onChange}>
        ...
    </Tab>
`}                            
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
