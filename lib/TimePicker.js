'use strict';

var React = require('react');

var _require = require('./util/time');

var timeStr2Obj = _require.timeStr2Obj;

var TimePicker = React.createClass({
    displayName: 'TimePicker',
    getInitialState: function getInitialState() {
        var _initTime = this.initTime();

        var hour = _initTime.hour;
        var min = _initTime.min;
        var sec = _initTime.sec;
        var value = _initTime.value;

        return {
            value: value,
            hour: hour,
            min: min,
            sec: sec
        };
    },
    initTime: function initTime() {
        var defaultVal = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _timeStr2Obj = timeStr2Obj(defaultVal, { simple: this.props.simple });

        var hour = _timeStr2Obj.hour;
        var min = _timeStr2Obj.min;
        var sec = _timeStr2Obj.sec;

        var value = this.formatValue(hour, min, sec);
        return { hour: hour, min: min, sec: sec, value: value };
    },
    formatValue: function formatValue(hour, min, sec) {
        return this.props.simple ? hour + ':' + min : hour + ':' + min + ':' + sec;
    },
    getDefaultProps: function getDefaultProps() {
        return {
            simple: false,
            value: ''
        };
    },
    handleInputChange: function handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    refreshValue: function refreshValue() {
        var _initTime2 = this.initTime(this.state.value);

        var hour = _initTime2.hour;
        var min = _initTime2.min;
        var sec = _initTime2.sec;
        var value = _initTime2.value;

        if (value != this.state.value) {
            this.setState({
                value: value,
                hour: hour,
                min: min,
                sec: sec
            }, this.handleTimeChange);
        }
    },
    handleTimeChange: function handleTimeChange() {
        if (this.props.onChange) this.props.onChange(this.state.value);
    },
    handleHourChange: function handleHourChange(hour) {
        this.setState({
            hour: hour,
            value: this.formatValue(hour, this.state.min, this.state.sec)
        }, this.handleTimeChange);
    },
    handleMinChange: function handleMinChange(min) {
        this.setState({
            min: min,
            value: this.formatValue(this.state.hour, min, this.state.sec)
        }, this.handleTimeChange);
    },
    handleSecChange: function handleSecChange(sec) {
        this.setState({
            sec: sec,
            value: this.formatValue(this.state.hour, this.state.min, sec)
        }, this.handleTimeChange);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'ui time-picker' },
            React.createElement('input', { className: '_input', onClick: this.refreshValue,
                onBlur: this.refreshValue, defaultValue: this.state.value, value: this.state.value,
                onChange: this.handleInputChange })
        );
    }
});

module.exports = TimePicker;