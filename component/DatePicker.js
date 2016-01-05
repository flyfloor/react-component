import React from 'react';
import {validateDate, formatDate} from './util/date';
import {initMaxAndMiniByNum} from './util/util';
import DocumentClickMixin from './mixin/DocumentClickMixin';
import Calender from './Calender';

const DatePicker = React.createClass({
    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: React.PropTypes.func
    },
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
            showPicker: false
        });
        if (this.props.onChange) this.props.onChange(value);
    },

    onOtherDomClick(){
        this.setState({
            showPicker: false
        });
    },

    render() {
        return (
            <div className="ui date-picker">
                <input className="_input" onClick={ () => {this.setState({ showPicker: true }) }} value={this.state.value}readOnly/>
                {this.state.showPicker ? <div className="_picker">
                                            <Calender begin={this.props.begin} end={this.props.end} value={this.state.value} onChange={this.handleValChange}></Calender>
                                        </div> : null
                }
            </div>
        );
    }
});


export default DatePicker;