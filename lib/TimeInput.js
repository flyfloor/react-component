'use strict';

var React = require('react');

var _require = require('./util/time');

var timeStr2Obj = _require.timeStr2Obj;

var klassName = require('./util/className');

var TimeInput = React.createClass({
    displayName: 'TimeInput',

    propTypes: {
        simple: React.PropTypes.bool,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
        var _initTime = this.initTime();

        var hour = _initTime.hour;
        var min = _initTime.min;
        var sec = _initTime.sec;
        var value = _initTime.value;

        return { value: value, hour: hour, min: min, sec: sec };
    },
    initTime: function initTime() {
        var val = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];
        var simple = this.props.simple;

        var _timeStr2Obj = timeStr2Obj(val, { simple: simple });

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
            value: '',
            className: ''
        };
    },
    handleInputChange: function handleInputChange(e) {
        var value = e.target.value;

        this.setState({ value: value });
    },
    refreshValue: function refreshValue() {
        var _initTime2 = this.initTime(this.state.value);

        var hour = _initTime2.hour;
        var min = _initTime2.min;
        var sec = _initTime2.sec;
        var value = _initTime2.value;

        this.setState({ value: value, hour: hour, min: min, sec: sec }, this.handleTimeChange);
    },
    handleTimeChange: function handleTimeChange() {
        var onChange = this.props.onChange;

        if (onChange) onChange(this.state.value);
    },
    handleHourChange: function handleHourChange(hour) {
        var _state = this.state;
        var min = _state.min;
        var sec = _state.sec;

        this.setState({
            hour: hour,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },
    handleMinChange: function handleMinChange(min) {
        var _state2 = this.state;
        var hour = _state2.hour;
        var sec = _state2.sec;

        this.setState({
            min: min,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },
    handleSecChange: function handleSecChange(sec) {
        var _state3 = this.state;
        var hour = _state3.hour;
        var min = _state3.min;

        this.setState({
            sec: sec,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },
    render: function render() {
        var value = this.state.value;
        var className = this.props.className;

        className = klassName(className, 'timeinput');
        return React.createElement(
            'div',
            { className: className },
            React.createElement('input', { className: '_input', onClick: this.refreshValue,
                onBlur: this.refreshValue, value: value,
                onChange: this.handleInputChange })
        );
    }
});

module.exports = TimeInput;