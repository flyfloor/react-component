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
        const {value} = this.state;
        if (value >= 10) {
            this.setState({
                value: value - 10,
            });
        }
    }

    handlePlus(){
        const {value} = this.state;
        if (value <= 110) {
            this.setState({
                value: value + 10
            });
        }
    }

    render() {
        const {value} = this.state;
        return (
            <div>
                <h3>Progress</h3>
                <ol>
                    <li>
                        <h4>Default progress</h4>
                        <Progress value={value}/>
                        <h1>
                            <a href="javascript:;" onClick={this.handleMinus.bind(this)}>-</a>
                            <span>  </span>
                            <a href="javascript:;" onClick={this.handlePlus.bind(this)}>+</a>
                        </h1>
                    </li>
                    <li>
                        <h4>Animated progress</h4>
                        <Progress value={40} status="active"/>
                    </li>
                    <li>
                        <h4>Completed progress</h4>
                        <Progress value={100}/>
                    </li>
                    <li>
                        <h4>Failed progress</h4>
                        <Progress value={30} status="failed"/>
                    </li>
                    <li>
                        <h4>Disabled progress</h4>
                        <Progress value={30} disabled={true}/>
                    </li>
                    <li>
                        <h4>Yield context</h4>
                        <Progress value={30}>
                            <span>this progress now is <span style={{'color': 'yellow'}}>30%</span></span>
                        </Progress>
                    </li>
                </ol>
            </div>
        );
    }
}
