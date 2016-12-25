'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var klassName = require('./util/className');
var TimeInput = require('./TimeInput');
var TimeInputMixin = require('./mixin/TimeInputMixin');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var SelectorList = require('./time-picker/SelectorList');
var timeStr2Obj = require('./util/time').timeStr2Obj;
var obj2TimeStr = require('./util/time').obj2TimeStr;

var TimePicker = React.createClass({
    displayName: 'TimePicker',

    mixins: [TimeInputMixin, DocumentClickMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            simple: false,
            className: '',
            placeHolder: 'input time'
        };
    },
    getInitialState: function getInitialState() {
        var _initTime = this.initTime(),
            _initTime$value = _initTime.value,
            value = _initTime$value === undefined ? "" : _initTime$value;

        if (value !== this.props.value) {
            this.props.onChange(value);
        }

        var _timeStr2Obj = timeStr2Obj(value),
            hour = _timeStr2Obj.hour,
            minute = _timeStr2Obj.minute,
            second = _timeStr2Obj.second;

        return {
            open: false,
            value: value,
            hour: hour,
            minute: minute,
            second: second
        };
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            open: false
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            var _initTime2 = this.initTime(nextProps.value),
                value = _initTime2.value;

            var _timeStr2Obj2 = timeStr2Obj(value),
                hour = _timeStr2Obj2.hour,
                minute = _timeStr2Obj2.minute,
                second = _timeStr2Obj2.second;

            this.setState({
                value: value, hour: hour, minute: minute, second: second
            });
        }
    },
    handleValueChange: function handleValueChange(value) {
        this.props.onChange(value);
    },
    handleFocus: function handleFocus() {
        this.setState({
            open: true
        });
    },
    handleBlur: function handleBlur(value) {
        var _timeStr2Obj3 = timeStr2Obj(value),
            hour = _timeStr2Obj3.hour,
            minute = _timeStr2Obj3.minute,
            second = _timeStr2Obj3.second;

        this.setState({
            hour: hour, minute: minute, second: second, value: value
        });
    },
    handleTimeChange: function handleTimeChange() {
        var _this = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
        var val = arguments[1];

        this.setState(_defineProperty({}, type, val), function () {
            var _state = _this.state,
                hour = _state.hour,
                minute = _state.minute,
                second = _state.second;

            var value = obj2TimeStr({ hour: hour, minute: minute, second: second });
            _this.setState({
                value: value
            });
            _this.props.onChange(value);
        });
    },
    formatSelectList: function formatSelectList() {
        var _this2 = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';

        var val = this.state[type];
        var max = type === 'hour' ? 24 : 60;
        var nodes = [];

        var _loop = function _loop(i) {
            var _i = i < 10 ? '0' + i : String(i);
            nodes.push(React.createElement(
                'li',
                { key: type + '-' + i, className: val == _i ? '_item _active' : '_item',
                    onClick: function onClick() {
                        return _this2.handleTimeChange(type, _i);
                    } },
                React.createElement(
                    'span',
                    null,
                    _i
                )
            ));
        };

        for (var i = 0; i < max; i++) {
            _loop(i);
        }
        return React.createElement(
            'ul',
            null,
            nodes
        );
    },
    render: function render() {
        var _state2 = this.state,
            value = _state2.value,
            open = _state2.open,
            hour = _state2.hour,
            second = _state2.second,
            minute = _state2.minute;
        var _props = this.props,
            simple = _props.simple,
            className = _props.className;

        className = klassName(className, 'timepicker', simple ? '_simple' : '');
        return React.createElement(
            'div',
            { className: className },
            React.createElement(TimeInput, { simple: simple, onChange: this.handleValueChange, value: value,
                onFocus: this.handleFocus, onBlur: this.handleBlur }),
            React.createElement(
                ReactCssTransitionGroup,
                { className: '_wrap', transitionName: 'timepicker',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? React.createElement(SelectorList, { simple: simple, hour: hour, second: second, minute: minute, onChange: this.handleTimeChange }) : null
            )
        );
    }
});

module.exports = TimePicker;