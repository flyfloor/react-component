'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
var timeUtil = require('./util/time');
var seconds2Obj = timeUtil.seconds2Obj,
    obj2Seconds = timeUtil.obj2Seconds;

var TimePicker = function (_Component) {
    _inherits(TimePicker, _Component);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this.handleValueChange = _this.handleValueChange.bind(_this);
        _this.handleInputClick = _this.handleInputClick.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleTimeChange = _this.handleTimeChange.bind(_this);

        var _this$initTime = _this.initTime({ value: props.value }),
            value = _this$initTime.value;

        _this.state = {
            open: false,
            value: value
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
            var _this2 = this;

            if (nextProps.value !== this.props.value) {
                var _initTime = this.initTime({ value: nextProps.value }),
                    value = _initTime.value;

                this.setState({
                    value: value
                }, function () {
                    return _this2.props.onChange(value);
                });
            }
        }
    }, {
        key: 'handleValueChange',
        value: function handleValueChange(val) {
            var _initTime2 = this.initTime({ value: val }),
                value = _initTime2.value;

            if (value !== this.state.value) {
                this.setState({
                    value: value
                });
                this.props.onChange(value);
            }
        }
    }, {
        key: 'handleInputClick',
        value: function handleInputClick() {
            var onClick = this.props.onClick;

            this.setState({
                open: true
            });
            if (onClick) onClick();
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            var onBlur = this.props.onBlur;

            if (onBlur) onBlur();
        }
    }, {
        key: 'handleTimeChange',
        value: function handleTimeChange() {
            var _this3 = this;

            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
            var val = arguments[1];
            var value = this.state.value;

            var valueObj = seconds2Obj(value);
            valueObj[type] = val;
            value = obj2Seconds(valueObj);

            this.setState({
                value: value
            }, function () {
                return _this3.props.onChange(value);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                simple = _props.simple,
                className = _props.className,
                onFocus = _props.onFocus;
            var _state = this.state,
                value = _state.value,
                open = _state.open;

            var _seconds2Obj = seconds2Obj(value),
                hour = _seconds2Obj.hour,
                second = _seconds2Obj.second,
                minute = _seconds2Obj.minute;

            className = klassName(className, 'timepicker', simple ? '_simple' : '');
            return React.createElement(
                'div',
                { className: className },
                React.createElement(TimeInput, { simple: simple,
                    onChange: this.handleValueChange,
                    value: value,
                    onFocus: onFocus,
                    onClick: this.handleInputClick,
                    onBlur: this.handleBlur }),
                React.createElement(
                    ReactCssTransitionGroup,
                    { className: '_wrap', transitionName: 'timepicker',
                        transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                    open ? React.createElement(SelectorList, { simple: simple, hour: hour,
                        second: second, minute: minute,
                        onChange: this.handleTimeChange }) : null
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