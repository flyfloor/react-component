'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _time = require('./util/time');

var _util = require('./util/util');

var _DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _DocumentClickMixin2 = _interopRequireDefault(_DocumentClickMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimePicker = _react2.default.createClass({
    displayName: 'TimePicker',

    mixins: [_DocumentClickMixin2.default],
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
            sec: sec,
            showPicker: false
        };
    },
    initTime: function initTime() {
        var defaultVal = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _validateTime = (0, _time.validateTime)(defaultVal, this.timeParams());

        var hour = _validateTime.hour;
        var min = _validateTime.min;
        var sec = _validateTime.sec;

        var value = this.formatValue(hour, min, sec);
        return { hour: hour, min: min, sec: sec, value: value };
    },
    formatValue: function formatValue(hour, min, sec) {
        var spacer = this.props.spacer;
        return this.props.simple ? '' + hour + spacer + min : '' + hour + spacer + min + spacer + sec;
    },
    onOtherDomClick: function onOtherDomClick(e) {
        this.setState({
            showPicker: false
        });
    },
    timeParams: function timeParams() {
        return {
            spacer: this.props.spacer,
            simple: this.props.simple,
            maxHour: this.props.maxHour,
            miniHour: this.props.miniHour,
            maxMin: this.props.maxMin,
            miniMin: this.props.miniMin,
            maxSec: this.props.maxSec,
            miniSec: this.props.miniSec
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            simple: false,
            spacer: ':',
            value: ''
        };
    },
    handleInputChange: function handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    handleBlur: function handleBlur(e) {
        var _initTime2 = this.initTime(this.state.value);

        var hour = _initTime2.hour;
        var min = _initTime2.min;
        var sec = _initTime2.sec;
        var value = _initTime2.value;

        this.setState({
            value: value,
            hour: hour,
            min: min,
            sec: sec
        }, this.handleTimeChange);
    },
    handleFocus: function handleFocus() {
        this.setState({
            showPicker: true
        });
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
    formatSelectorNode: function formatSelectorNode() {
        var _this = this;

        var hourRangeNode = [],
            minRangeNode = [],
            secRangeNode = [];
        var hourRange = (0, _util.initMaxAndMiniByNum)(this.props.maxHour, this.props.miniHour, 23);
        var minRange = (0, _util.initMaxAndMiniByNum)(this.props.maxMin, this.props.miniMin, 59);
        var secRange = (0, _util.initMaxAndMiniByNum)(this.props.maxSec, this.props.miniSec, 59);

        var _loop = function _loop(i) {
            var index = i < 10 ? '0' + i : i;
            hourRangeNode.push(_react2.default.createElement(
                'li',
                { key: 'hour-selector-' + index, onClick: function onClick() {
                        _this.handleHourChange(index);
                    },
                    className: _this.state.hour == index ? '_item _active' : '_item' },
                index
            ));
        };

        for (var i = hourRange.mini; i <= hourRange.max; i++) {
            _loop(i);
        }

        var _loop2 = function _loop2(i) {
            var index = i < 10 ? '0' + i : i;
            minRangeNode.push(_react2.default.createElement(
                'li',
                { key: 'min-selector-' + index, onClick: function onClick() {
                        return _this.handleMinChange(index);
                    },
                    className: _this.state.min == index ? '_item _active' : '_item' },
                index
            ));
        };

        for (var i = minRange.mini; i <= minRange.max; i++) {
            _loop2(i);
        }

        if (this.props.simple) {
            return _react2.default.createElement(
                'div',
                { className: '_content' },
                _react2.default.createElement(
                    'ul',
                    null,
                    hourRangeNode
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    minRangeNode
                )
            );
        }

        var _loop3 = function _loop3(i) {
            var index = i < 10 ? '0' + i : i;
            secRangeNode.push(_react2.default.createElement(
                'li',
                { key: 'sec-selector-' + index, onClick: function onClick() {
                        return _this.handleSecChange(index);
                    },
                    className: _this.state.sec == index ? '_item _active' : '_item' },
                index
            ));
        };

        for (var i = secRange.mini; i <= secRange.max; i++) {
            _loop3(i);
        }

        return _react2.default.createElement(
            'div',
            { className: '_content' },
            _react2.default.createElement(
                'ul',
                null,
                hourRangeNode
            ),
            _react2.default.createElement(
                'ul',
                null,
                minRangeNode
            ),
            _react2.default.createElement(
                'ul',
                null,
                secRangeNode
            )
        );
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'ui time-picker' },
            _react2.default.createElement('input', { className: '_input', onBlur: this.handleBlur, defaultValue: this.state.value, value: this.state.value,
                onFocus: this.handleFocus, onChange: this.handleInputChange }),
            _react2.default.createElement(
                'div',
                { className: this.props.simple ? '_selector _simple' : '_selector' },
                this.state.showPicker ? this.formatSelectorNode() : null
            )
        );
    }
});

exports.default = TimePicker;