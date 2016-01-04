import React from 'react';
import {validateDate, formatDate} from './util/date';
import {initMaxAndMiniByNum} from './util/util';
import Calender from './Calender';

const DatePicker = React.createClass({
    getInitialState() {
        let value = this.initDate();
        return {
            value,
        };
    },

    initDate(defaultValue=this.props.value){
        let {year, month, day} = validateDate(defaultValue, this.dateParams());
        return formatDate(year, month, day)
    },

    dateParams(){
        return {
            begin: this.props.begin,
            end: this.props.end,
        }
    },

    render() {
        return (
            <div className="ui date-picker">
                <div className="_input">{this.state.value}</div>
                <div className="_picker">
                    <Calender date={this.state.value}></Calender>
                </div>
            </div>
        );
    }
});


export default DatePicker;