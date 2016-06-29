import React, { Component } from 'react';
import {Progress} from './index';

export default class ProgressDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 30,
        };
    }

    handleMinus(){
        let {value} = this.state;
        value -= 10;
        if (value < 0) value = 0;
        this.setState({
            value,
        });
    }

    handlePlus(){
        let {value} = this.state;
        value += 10;
        if (value > 100) value = 100;
        this.setState({
            value
        });
    }

    render() {
        const {value} = this.state;
        return (
            <div>
                <h3>Progress</h3>
                <ol style={{'width': '80%'}}>
                    <li>
                        <h4>Default progress</h4>
                        <Progress value={value}/>
                        <h2>
                            <a href="javascript:;" onClick={this.handleMinus.bind(this)}>-</a>
                            <span>  </span>
                            <a href="javascript:;" onClick={this.handlePlus.bind(this)}>+</a>
                        </h2>
                        <pre>
                            <code>
                                {`<Progress value={value}/>`}                                
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Animated progress</h4>
                        <Progress value={40} status="active"/>
                        <pre>
                            <code>
                                {`<Progress value={40} status="active"/>`}   
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Completed progress</h4>
                        <Progress value={100}/>
                        <pre>
                            <code>
                                {`<Progress value={100}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Failed progress</h4>
                        <Progress value={30} status="failed"/>
                        <pre>
                            <code>
                                {`<Progress value={30} status="failed"/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Disabled progress</h4>
                        <Progress value={30} disabled={true}/>
                        <pre>
                            <code>
                                {`<Progress value={30} disabled={true}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Yield context</h4>
                        <Progress value={30}>
                            <span>this progress now is <span style={{'color': 'yellow'}}>30%</span></span>
                        </Progress>
                        <pre>
                            <code>
{`
<Progress value={value}>
    this progress now is 
    <span style={{'color': 'yellow'}}>
        {value}
    </span>
</Progress>
`}                                
                            </code>
                        </pre>
                    </li>
                </ol>
            </div>
        );
    }
}
