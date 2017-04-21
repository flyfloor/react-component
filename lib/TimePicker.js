'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var klassName = require('./util/className');
var TimeInput = require('./TimeInput');
var timeInputCmp = require('./high-order/timeInputCmp');
var documentClickCmp = require('./high-order/documentClickCmp');
var SelectorList = require('./time-picker/SelectorList');
var timeStr2Obj = require('./util/time').timeStr2Obj;
var obj2TimeStr = require('./util/time').obj2TimeStr;

var TimePicker = function (_Component) {
    _inherits(TimePicker, _Component);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this.handleValueChange = _this.handleValueChange.bind(_this);
        _this.handleInputClick = _this.handleInputClick.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleTimeChange = _this.handleTimeChange.bind(_this);

        var _this$initTime = _this.initTime(),
            _this$initTime$value = _this$initTime.value,
            value = _this$initTime$value === undefined ? "" : _this$initTime$value;

        var _timeStr2Obj = timeStr2Obj(value),
            hour = _timeStr2Obj.hour,
            minute = _timeStr2Obj.minute,
            second = _timeStr2Obj.second;

        _this.state = {
            open: false,
            value: value,
            hour: hour,
            minute: minute,
            second: second
        };
        return _this;
    }

    _createClass(TimePicker, [{
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.props.value) {
                var _initTime = this.initTime(nextProps.value),
                    value = _initTime.value;

                var _timeStr2Obj2 = timeStr2Obj(value),
                    hour = _timeStr2Obj2.hour,
                    minute = _timeStr2Obj2.minute,
                    second = _timeStr2Obj2.second;

                this.setState({
                    value: value, hour: hour, minute: minute, second: second
                });
            }
        }
    }, {
        key: 'handleValueChange',
        value: function handleValueChange(value) {
            this.props.onChange(value);
        }
    }, {
        key: 'handleInputClick',
        value: function handleInputClick() {
            this.setState({
                open: true
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(value) {
            var _timeStr2Obj3 = timeStr2Obj(value),
                hour = _timeStr2Obj3.hour,
                minute = _timeStr2Obj3.minute,
                second = _timeStr2Obj3.second;

            this.setState({
                hour: hour, minute: minute, second: second, value: value
            });
        }
    }, {
        key: 'handleTimeChange',
        value: function handleTimeChange() {
            var _this2 = this;

            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
            var val = arguments[1];

            this.setState(_defineProperty({}, type, val), function () {
                var _state = _this2.state,
                    hour = _state.hour,
                    minute = _state.minute,
                    second = _state.second;

                var value = obj2TimeStr({ hour: hour, minute: minute, second: second });
                _this2.setState({
                    value: value
                });
                _this2.props.onChange(value);
            });
        }
    }, {
        key: 'render',
        value: function render() {
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
                    onClick: this.handleInputClick, onBlur: this.handleBlur }),
                React.createElement(
                    ReactCssTransitionGroup,
                    { className: '_wrap', transitionName: 'timepicker',
                        transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                    open ? React.createElement(SelectorList, { simple: simple, hour: hour, second: second, minute: minute, onChange: this.handleTimeChange }) : null
                )
            );
        }
    }]);

    return TimePicker;
}(Component);

TimePicker.defaultProps = {
    simple: false,
    className: '',
    placeHolder: 'input time'
};

module.exports = timeInputCmp(documentClickCmp(TimePicker));