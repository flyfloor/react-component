import React from 'react'
import {dateStr2Obj, obj2DateStr} from './util/date'
import DocumentClickMixin from './mixin/DocumentClickMixin'
import Calender from './Calender'
import klassName from './util/className'

const DatePicker = React.createClass({
    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            className: '',
        };
    },

    getInitialState() {
        const value = this.initDate();
        return { value, showPicker: false };
    },

    initDate(defaultValue=this.props.value){
        const {year, month, day} = dateStr2Obj(defaultValue, this.dateParams());
        return obj2DateStr(year, month, day);
    },

    dateParams(){
        const {begin, end} = this.props;
        return { begin, end };
    },

    handleValChange(value){
        const {onChange} = this.props;
        this.setState({
            value,
            showPicker: false
        });
        if (onChange) onChange(value);
    },

    onOtherDomClick(){
        this.setState({
            showPicker: false
        });
    },

    render() {
        const {showPicker, value} = this.state;
        let {begin, end, className} = this.props;
        if (showPicker) className += ' _active';
        return (
            <div className={klassName('datepicker', className)}>
                <div className="input" onClick={() => {this.setState({ showPicker: true }) }}>
                    <input type="text" className="_input" value={value} readOnly/>
                    <i></i>
                </div>
                <div className="_picker">
                    <Calender begin={begin} end={end} 
                        value={value} onChange={this.handleValChange}/>
                </div> 
            </div>
        );
    }
});

export default DatePicker