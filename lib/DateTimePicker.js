'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var PropTypes = React.PropTypes;
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

var Calendar = require('./Calendar');
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
        onChange: PropTypes.func.isRequired,
        confirm: PropTypes.element,
        placeHolder: PropTypes.string
    },
    getDefaultProps: function getDefaultProps() {
        return {
            format: 'yyyy-MM-dd',
            confirm: React.createElement(
                'button',
                null,
                'confirm'
            ),
            placeHolder: 'select date'
        };
    },
    getInitialState: function getInitialState() {
        var _initDateTime = this.initDateTime(),
            value = _initDateTime.value,
            minute = _initDateTime.minute,
            second = _initDateTime.second,
            hour = _initDateTime.hour;

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

        if (!date) {
            // default value is undefined
            var nowDateObj = extractDate(new Date(), { showTime: true });
            var hour = nowDateObj.hour;
            var minute = nowDateObj.minute;
            var second = nowDateObj.second;
            return { minute: minute, second: second, hour: hour };
        }
        return Object.assign(extractDate(date, { showTime: true }), { value: date });
    },
    handleDateChange: function handleDateChange(date) {
        var _this = this;

        var _state = this.state,
            hour = _state.hour,
            minute = _state.minute,
            second = _state.second;
        // intialize default time

        if (!hour || !minute || !second) {
            var nowDateObj = extractDate(new Date(), { showTime: true });
            hour = nowDateObj.hour;
            minute = nowDateObj.minute;
            second = nowDateObj.second;
            this.setState({ hour: hour, minute: minute, second: second });
        }
        date.setHours(hour, minute, second);
        this.setState({
            value: date
        }, function () {
            // onChange date
            _this.props.onChange(new Date(date.getTime()));
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

            if (!value) {
                value = new Date();
            }

            value.setHours(hour, minute, second);
            _this2.setState({
                value: value
            }, function () {
                // onChange date
                _this2.props.onChange(new Date(value.getTime()));
            });
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (!nextProps.value) {
            return;
        }
        // not have value or value changed
        if (!this.props.value || nextProps.value.getTime() !== this.props.value.getTime()) {
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
    handleConfirm: function handleConfirm() {
        var _this3 = this;

        var _state3 = this.state,
            value = _state3.value,
            minute = _state3.minute,
            hour = _state3.hour,
            second = _state3.second;
        var _props = this.props,
            begin = _props.begin,
            end = _props.end;

        var _preventClose = false;
        if (!value) {
            value = new Date();
            value.setHours(hour, minute, second);
            if (begin && value < begin) {
                value = new Date(begin.getTime());
                _preventClose = true;
            }
            if (end && value > end) {
                value = new Date(end.getTime());
                _preventClose = true;
            }
            this.setState({
                value: value
            }, function () {
                // onChange date
                _this3.props.onChange(new Date(value.getTime()));
            });
            if (_preventClose) {
                return;
            }
        }
        this.handleOpen(false);
    },
    togglePicker: function togglePicker() {
        var showDate = this.state.showDate;

        this.setState({
            showDate: !showDate
        });
    },
    render: function render() {
        var _this4 = this;

        var _props2 = this.props,
            className = _props2.className,
            begin = _props2.begin,
            end = _props2.end,
            format = _props2.format,
            confirm = _props2.confirm,
            placeHolder = _props2.placeHolder;
        var _state4 = this.state,
            hour = _state4.hour,
            second = _state4.second,
            minute = _state4.minute,
            value = _state4.value,
            showDate = _state4.showDate,
            open = _state4.open;

        var date = formatDate(value, format + ' hh:mm:ss');
        var pickerNode = showDate ? React.createElement(
            'div',
            { className: '_datepicker' },
            value ? React.createElement(Calendar, { showPreview: false, begin: begin,
                end: end, value: new Date(value.getTime()), onChange: this.handleDateChange }) : React.createElement(Calendar, { showPreview: false, begin: begin,
                end: end, onChange: this.handleDateChange }),
            React.createElement(
                'div',
                { className: '_action' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_selector', onClick: this.togglePicker },
                    '\u9009\u62E9\u65F6\u95F4'
                ),
                React.createElement(
                    'span',
                    { className: '_button', onClick: this.handleConfirm },
                    confirm
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
                    'span',
                    { className: '_button', onClick: this.handleConfirm },
                    confirm
                )
            )
        );
        return React.createElement(
            'div',
            { className: klassName('datetime-picker', className) },
            React.createElement(
                'div',
                { className: '_input', onClick: function onClick() {
                        return _this4.handleOpen(true);
                    } },
                React.createElement('input', { type: 'text', placeholder: placeHolder, readOnly: true, value: date }),
                React.createElement('i', null)
            ),
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