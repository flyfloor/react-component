const React = require('react');
const {timeStr2Obj} = require('./util/time');

const TimePicker = React.createClass({
    getInitialState() {
        let {hour, min, sec, value} = this.initTime();
        return {
            value: value,
            hour: hour,
            min: min,
            sec: sec,
        };
    },

    initTime(defaultVal = this.props.value){
        let {hour, min, sec} = timeStr2Obj(defaultVal, { simple: this.props.simple });
        let value = this.formatValue(hour, min, sec);
        return {hour, min, sec, value}
    },

    formatValue(hour, min, sec){
        return this.props.simple ? `${hour}:${min}` : `${hour}:${min}:${sec}`
    },

    getDefaultProps() {
        return {
            simple: false,
            value: ''
        };
    },

    handleInputChange(e){
        this.setState({
            value: e.target.value,
        });
    },

    refreshValue(){
        let {hour, min, sec, value} = this.initTime(this.state.value);
        if (value != this.state.value) {
            this.setState({
                value: value,
                hour: hour,
                min: min,
                sec: sec,
            }, this.handleTimeChange);
        }
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

    render() {
        return (
            <div className="ui time-picker">
                <input className="_input" onClick={this.refreshValue} 
                    onBlur={this.refreshValue} defaultValue={this.state.value} value={this.state.value} 
                    onChange={this.handleInputChange}/>
            </div>
        );
    }
});


module.exports = TimePicker;