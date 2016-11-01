'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _time = require('./util/time');

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeInput = _react2.default.createClass({
    displayName: 'TimeInput',

    propTypes: {
        simple: _react2.default.PropTypes.bool,
        value: _react2.default.PropTypes.string,
        onChange: _react2.default.PropTypes.func,
        className: _react2.default.PropTypes.string
    },

    getInitialState: function getInitialState() {
        var _initTime = this.initTime(),
            hour = _initTime.hour,
            min = _initTime.min,
            sec = _initTime.sec,
            value = _initTime.value;

        return { value: value, hour: hour, min: min, sec: sec };
    },
    initTime: function initTime() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;
        var simple = this.props.simple;

        var _timeStr2Obj = (0, _time.timeStr2Obj)(val, { simple: simple }),
            hour = _timeStr2Obj.hour,
            min = _timeStr2Obj.min,
            sec = _timeStr2Obj.sec;

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
        var _initTime2 = this.initTime(this.state.value),
            hour = _initTime2.hour,
            min = _initTime2.min,
            sec = _initTime2.sec,
            value = _initTime2.value;

        this.setState({ value: value, hour: hour, min: min, sec: sec }, this.handleTimeChange);
    },
    handleTimeChange: function handleTimeChange() {
        var onChange = this.props.onChange;

        if (onChange) onChange(this.state.value);
    },
    handleHourChange: function handleHourChange(hour) {
        var _state = this.state,
            min = _state.min,
            sec = _state.sec;

        this.setState({
            hour: hour,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },
    handleMinChange: function handleMinChange(min) {
        var _state2 = this.state,
            hour = _state2.hour,
            sec = _state2.sec;

        this.setState({
            min: min,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },
    handleSecChange: function handleSecChange(sec) {
        var _state3 = this.state,
            hour = _state3.hour,
            min = _state3.min;

        this.setState({
            sec: sec,
            value: this.formatValue(hour, min, sec)
        }, this.handleTimeChange);
    },
    render: function render() {
        var value = this.state.value;
        var className = this.props.className;

        className = (0, _className2.default)(className, 'timeinput');
        return _react2.default.createElement(
            'div',
            { className: className },
            _react2.default.createElement('input', { type: 'text', className: '_input', onClick: this.refreshValue,
                onBlur: this.refreshValue, value: value,
                onChange: this.handleInputChange })
        );
    }
});

exports.default = TimeInput;