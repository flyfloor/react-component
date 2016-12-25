'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var PropTypes = React.PropTypes;
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

var Calender = require('./Calender');
var klassName = require('./util/className');
var SelectorList = require('./time-picker/SelectorList');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var datetime = require('./util/datetime');
var formatDate = datetime.formatDate,
    extractDate = datetime.extractDate;


var DateTimePicker = React.createClass({
    displayName: 'DateTimePicker',

    mixins: [DocumentClickMixin],
    propTypes: {
        format: PropTypes.string.isRequired,
        value: PropTypes.instanceOf(Date),
        onChange: PropTypes.func.isRequired
    },
    getDefaultProps: function getDefaultProps() {
        return {
            format: 'yyyy-MM-dd',
            value: new Date()
        };
    },
    getInitialState: function getInitialState() {
        var _initDateTime = this.initDateTime(),
            value = _initDateTime.value,
            minute = _initDateTime.minute,
            second = _initDateTime.second,
            hour = _initDateTime.hour;

        if (value !== this.props.value) {
            this.props.onChange(value);
        }
        return {
            value: value,
            minute: minute,
            second: second,
            hour: hour,
            open: false,
            showDate: true
        };
    },
    initDateTime: function initDateTime() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

        return Object.assign(extractDate(date, { showTime: true }), { value: date });
    },
    handleDateChange: function handleDateChange(date) {
        var _this = this;

        var _state = this.state,
            hour = _state.hour,
            minute = _state.minute,
            second = _state.second;

        date.setHours(hour, minute, second);
        this.setState({
            value: date
        }, function () {
            return _this.props.onChange(date);
        });
    },
    handleTimeChange: function handleTimeChange() {
        var _this2 = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
        var val = arguments[1];

        this.setState(_defineProperty({}, type, val), function () {
            var _state2 = _this2.state,
                hour = _state2.hour,
                minute = _state2.minute,
                second = _state2.second,
                value = _state2.value;

            if (value) {
                value.setHours(hour, minute, second);
                _this2.setState({
                    value: value
                }, function () {
                    return _this2.props.onChange(value);
                });
            }
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value.getTime() !== this.props.value.getTime()) {
            this.setState(this.initDateTime(nextProps.value));
        }
    },
    onOtherDomClick: function onOtherDomClick() {
        this.handleOpen(false);
    },
    handleOpen: function handleOpen(open) {
        this.setState({
            open: open,
            showDate: open
        });
    },
    togglePicker: function togglePicker() {
        var showDate = this.state.showDate;

        this.setState({
            showDate: !showDate
        });
    },
    render: function render() {
        var _this3 = this;

        var _props = this.props,
            className = _props.className,
            begin = _props.begin,
            end = _props.end,
            format = _props.format;
        var _state3 = this.state,
            hour = _state3.hour,
            second = _state3.second,
            minute = _state3.minute,
            value = _state3.value,
            showDate = _state3.showDate,
            open = _state3.open;

        var date = formatDate(value, format + ' hh:mm:ss');
        var pickerNode = showDate ? React.createElement(
            'div',
            { className: '_datepicker' },
            React.createElement(Calender, { showPreview: false, begin: begin,
                end: end, value: new Date(value.getTime()), onChange: this.handleDateChange }),
            React.createElement(
                'div',
                { className: '_action' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_selector', onClick: this.togglePicker },
                    '\u9009\u62E9\u65F6\u95F4'
                ),
                React.createElement(
                    'button',
                    { className: '_button', onClick: function onClick() {
                            return _this3.handleOpen(false);
                        } },
                    '\u786E\u8BA4'
                )
            )
        ) : React.createElement(
            'div',
            { className: '_timepicker' },
            React.createElement(SelectorList, { hour: hour, second: second,
                minute: minute, onChange: this.handleTimeChange }),
            React.createElement(
                'div',
                { className: '_action' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_selector', onClick: this.togglePicker },
                    '\u9009\u62E9\u65E5\u671F'
                ),
                React.createElement(
                    'button',
                    { className: '_button', onClick: function onClick() {
                            return _this3.handleOpen(false);
                        } },
                    '\u786E\u8BA4'
                )
            )
        );
        return React.createElement(
            'div',
            { className: klassName('datetime-picker', className) },
            React.createElement('input', { type: 'text', className: '_input', readOnly: true, value: date, onClick: function onClick() {
                    return _this3.handleOpen(true);
                } }),
            React.createElement(
                ReactCssTransitionGroup,
                { className: '_wrap', transitionName: 'datetime',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? pickerNode : null
            )
        );
    }
});

module.exports = DateTimePicker;