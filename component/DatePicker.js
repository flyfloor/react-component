import React from 'react';
import {validateDate, formatDate} from './util/date';
import {initMaxAndMiniByNum} from './util/util';
import DocumentClickMixin from './mixin/DocumentClickMixin';
import Calender from './Calender';

const DatePicker = React.createClass({
    mixins: [DocumentClickMixin],
    getInitialState() {
        let value = this.initDate();
        return {
            value,
            showPicker: false,
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

    handleValChange(value){
        this.setState({
            value,
        }, () => {
            this.setState({
                showPicker: false
            });
        });
    },

    onOtherDomClick(){
        this.setState({
            showPicker: false
        });
    },

    showPicker(){
        console.log(this.state.value)
        this.setState({
            showPicker: true 
        });
    },

    render() {
        return (
            <div className="ui date-picker">
                <input className="_input" onClick={this.showPicker} value={this.state.value}readOnly/>
                {this.state.showPicker ? <div className="_picker">
                                            <Calender value={this.state.value} onChange={this.handleValChange}></Calender>
                                        </div> : null
                }
            </div>
        );
    }
});


export default DatePicker;