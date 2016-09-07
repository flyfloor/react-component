const React = require('react');
const {timeStr2Obj} = require('./util/time');
const klassName = require('./util/className');

const TimeInput = React.createClass({
    propTypes: {
        simple: React.PropTypes.bool,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string,
    },

    getInitialState() {
        let {hour, min, sec, value} = this.initTime();
        return { value, hour, min, sec };
    },

    initTime(val = this.props.value){
        const {simple} = this.props;
        let {hour, min, sec} = timeStr2Obj(val, { simple });
        let value = this.formatValue(hour, min, sec);
        return {hour, min, sec, value}
    },

    formatValue(hour, min, sec){
        return this.props.simple ? `${hour}:${min}` : `${hour}:${min}:${sec}`
    },

    getDefaultProps() {
        return {
            simple: false,
            value: '',
            className: '',
        };
    },

    handleInputChange(e){
        const {value} = e.target;
        this.setState({ value });
    },

    refreshValue(){
        const {hour, min, sec, value} = this.initTime(this.state.value);
        this.setState({ value, hour, min, sec }, this.handleTimeChange);
    },

    handleTimeChange(){
        const {onChange} = this.props;
        if (onChange) onChange(this.state.value)
    },

    handleHourChange(hour){
        const {min, sec} = this.state;
        this.setState({
            hour,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },

    handleMinChange(min){
        const {hour, sec} = this.state;
        this.setState({
            min,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },

    handleSecChange(sec){
        const {hour, min} = this.state;
        this.setState({
            sec: sec,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },

    render() {
        const {value} = this.state;
        let {className} = this.props;
        className = klassName(className, 'timeinput');
        return (
            <div className={className}>
                <input className="_input" onClick={this.refreshValue} 
                    onBlur={this.refreshValue} value={value} 
                    onChange={this.handleInputChange}/>
            </div>
        );
    }
});


module.exports = TimeInput;