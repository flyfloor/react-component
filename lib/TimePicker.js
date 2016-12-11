'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var klassName = require('./util/className');
var TimeInput = require('./TimeInput');
var TimeInputMixin = require('./mixin/TimeInputMixin');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var timeStr2Obj = require('./util/time').timeStr2Obj;
var obj2TimeStr = require('./util/time').obj2TimeStr;

var TimePicker = React.createClass({
    displayName: 'TimePicker',

    mixins: [TimeInputMixin, DocumentClickMixin],

    getDefaultProps: function getDefaultProps() {
        var _d = new Date();
        var value = _d.getHours() + ':' + _d.getMinutes() + ':' + _d.getSeconds();
        return {
            simple: false,
            value: value,
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
            min = _timeStr2Obj.min,
            sec = _timeStr2Obj.sec;

        return {
            open: false,
            value: value,
            hour: hour,
            min: min,
            sec: sec
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
                min = _timeStr2Obj2.min,
                sec = _timeStr2Obj2.sec;

            this.setState({
                value: value, hour: hour, min: min, sec: sec
            });
        }
    },
    handleValueChange: function handleValueChange(value) {
        this.props.onChange(value);
    },
    handleFocus: function handleFocus() {
        this.setState({
            open: true
        }, this.handleInitScroll);
    },
    handleInitScroll: function handleInitScroll() {
        this.initScrollTo('hour');
        this.initScrollTo('min');
        this.initScrollTo('sec');
    },
    initScrollTo: function initScrollTo(type) {
        var val = this.state[type];
        var dom = ReactDOM.findDOMNode(this.refs[type + 'List']);
        if (dom) {
            var selected = dom.children[0].children[parseInt(val)];
            var to = selected.offsetTop;
            dom.scrollTop = to;
        }
    },
    handleBlur: function handleBlur(value) {
        var _timeStr2Obj3 = timeStr2Obj(value),
            hour = _timeStr2Obj3.hour,
            min = _timeStr2Obj3.min,
            sec = _timeStr2Obj3.sec;

        this.setState({
            hour: hour, min: min, sec: sec, value: value
        });
    },
    handleTimeChange: function handleTimeChange() {
        var _this = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
        var val = arguments[1];

        this.setState(_defineProperty({}, type, val), function () {
            var _state = _this.state,
                hour = _state.hour,
                min = _state.min,
                sec = _state.sec;

            var value = obj2TimeStr({ hour: hour, min: min, sec: sec });
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
            open = _state2.open;

        return React.createElement(
            'div',
            { className: klassName('timepicker') },
            React.createElement(TimeInput, { onChange: this.handleValueChange, value: value,
                onFocus: this.handleFocus, onBlur: this.handleBlur }),
            React.createElement(
                ReactCssTransitionGroup,
                { className: '_wrap', transitionName: 'timepicker',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: '_list _hour', ref: 'hourList' },
                        this.formatSelectList('hour')
                    ),
                    React.createElement(
                        'div',
                        { className: '_list _min', ref: 'minList' },
                        this.formatSelectList('min')
                    ),
                    React.createElement(
                        'div',
                        { className: '_list _sec', ref: 'secList' },
                        this.formatSelectList('sec')
                    )
                ) : null
            )
        );
    }
});

module.exports = TimePicker;