import React from 'react';
import {Calender} from './index.js';

export default class CalenderDemo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: '2016-01-02'
        }
    }

    handleChange(){

    }

    render() {
        return (
            <ol>
                <li>
                    <h4>Default Calender</h4>
                    <Calender/>
                </li>
                <li>
                    <h4>Calender with given value 2015-12-20</h4>
                    <Calender value="2015-12-20"/>
                </li>
                <li>
                    <h4>Calender with value change event</h4>
                    <p>date changed to {this.state.value}</p>
                    <Calender value="2016-01-03" onChange={this.handleChange.bind(this)}/>
                </li>
            </ol>
        );
    }
}
