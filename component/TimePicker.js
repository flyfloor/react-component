import React from 'react';
import {validateTime} from './util/time';
import {initMaxAndMiniByNum} from './util/util';
import DocumentClickMixin from './mixin/DocumentClickMixin';

const TimePicker = React.createClass({
    mixins: [DocumentClickMixin],
    getInitialState() {
        let {hour, min, sec, value} = this.initTime();
        return {
            value: value,
            hour: hour,
            min: min,
            sec: sec,
            showPicker: false,
        };
    },

    initTime(defaultVal = this.props.value){
        let {hour, min, sec} = validateTime(defaultVal, this.timeParams());
        let value = this.formatValue(hour, min, sec);
        return {hour, min, sec, value}
    },

    formatValue(hour, min, sec){
        let spacer = this.props.spacer;
        return this.props.simple ? `${hour}${spacer}${min}` : `${hour}${spacer}${min}${spacer}${sec}`
    },

    onOtherDomClick(e){
        this.setState({
            showPicker: false,
        });
    },

    timeParams(){
        return {
            spacer: this.props.spacer, 
            simple: this.props.simple,
            maxHour: this.props.maxHour,
            miniHour: this.props.miniHour,
            maxMin: this.props.maxMin,
            miniMin: this.props.miniMin,
            maxSec: this.props.maxSec,
            miniSec: this.props.miniSec,
        }
    },

    getDefaultProps() {
        return {
            simple: false,
            spacer: ':',
            value: ''
        };
    },

    handleInputChange(e){
        this.setState({
            value: e.target.value,
        });
    },

    handleBlur(e){
        let {hour, min, sec, value} = this.initTime(this.state.value);
        this.setState({
            value: value,
            hour: hour,
            min: min,
            sec: sec,
        }, this.handleTimeChange);
    },

    handleFocus(){
        this.setState({
            showPicker: true 
        });
    },

    handleTimeChange(){
        if (this.props.onChange) this.props.onChange(this.state.value)
    },

    handleHourChange(hour){
        this.setState({
            hour: hour,
            value: this.formatValue(hour, this.state.min, this.state.sec)
        }, this.handleTimeChange);
    },

    handleMinChange(min){
        this.setState({
            min: min,
            value: this.formatValue(this.state.hour, min, this.state.sec)
        }, this.handleTimeChange);
    },

    handleSecChange(sec){
        this.setState({
            sec: sec,
            value: this.formatValue(this.state.hour, this.state.min, sec)
        }, this.handleTimeChange);
    },

    formatSelectorNode(){
        let hourRangeNode = [], minRangeNode = [], secRangeNode = [];
        let hourRange = initMaxAndMiniByNum(this.props.maxHour, this.props.miniHour, 23);
        let minRange = initMaxAndMiniByNum(this.props.maxMin, this.props.miniMin, 59);
        let secRange = initMaxAndMiniByNum(this.props.maxSec, this.props.miniSec, 59);

        for(let i = hourRange.mini; i <= hourRange.max; i ++ ){
            let index = i < 10 ? `0${i}`: i;
            hourRangeNode.push(<li key={`hour-selector-${index}`} onClick={() => {this.handleHourChange(index)}} 
                                className={this.state.hour == index ? '_item _active' : '_item'}>{index}</li>)
        }

        for(let i = minRange.mini; i <= minRange.max; i ++ ){
            let index = i < 10 ? `0${i}`: i;
            minRangeNode.push(<li key={`min-selector-${index}`} onClick={() => this.handleMinChange(index)} 
                            className={this.state.min == index ? '_item _active' : '_item'}>{index}</li>)
        }

        if (this.props.simple) {
            return <div className="_content">
                        <ul>
                            {hourRangeNode}
                        </ul>
                        <ul>
                            {minRangeNode}
                        </ul>
                    </div>
        }

        for(let i = secRange.mini; i <= secRange.max; i ++ ){
            let index = i < 10 ? `0${i}`: i;
            secRangeNode.push(<li key={`sec-selector-${index}`} onClick={() => this.handleSecChange(index)} 
                            className={this.state.sec == index ? '_item _active' : '_item'}>{index}</li>)
        }

        return <div className="_content">
                    <ul>
                        {hourRangeNode}
                    </ul>
                    <ul>
                        {minRangeNode}
                    </ul>
                    <ul>
                        {secRangeNode}
                    </ul>
                </div>
    },

    render() {
        

        return (
            <div className="ui time-picker">
                <input className="_input" onBlur={this.handleBlur} defaultValue={this.state.value} value={this.state.value} 
                    onFocus={this.handleFocus} onChange={this.handleInputChange}/>
                <div className={this.props.simple ? '_selector _simple' : '_selector'}>
                    {this.state.showPicker ? this.formatSelectorNode() : null}
                </div>
            </div>
        );
    }
});


export default TimePicker;