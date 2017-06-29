'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

var Calendar = require('./Calendar');
var klassName = require('./util/className');
var SelectorList = require('./time-picker/SelectorList');
var documentClickCmp = require('./high-order/documentClickCmp');
var datetime = require('./util/datetime');
var formatDate = datetime.formatDate,
    extractDate = datetime.extractDate;

var DateTimePicker = function (_Component) {
    _inherits(DateTimePicker, _Component);

    function DateTimePicker(props) {
        _classCallCheck(this, DateTimePicker);

        var _this = _possibleConstructorReturn(this, (DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call(this, props));

        _this.handleDateChange = _this.handleDateChange.bind(_this);
        _this.handleTimeChange = _this.handleTimeChange.bind(_this);
        _this.handleOpen = _this.handleOpen.bind(_this);
        _this.handleConfirm = _this.handleConfirm.bind(_this);
        _this.togglePicker = _this.togglePicker.bind(_this);

        var _this$initDateTime = _this.initDateTime(),
            value = _this$initDateTime.value,
            minute = _this$initDateTime.minute,
            second = _this$initDateTime.second,
            hour = _this$initDateTime.hour;

        _this.state = {
            value: value,
            minute: minute,
            second: second,
            hour: hour,
            open: false,
            showDate: true
        };
        return _this;
    }

    _createClass(DateTimePicker, [{
        key: 'initDateTime',
        value: function initDateTime() {
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
        }
    }, {
        key: 'handleDateChange',
        value: function handleDateChange(date) {
            var _this2 = this;

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
                _this2.props.onChange(new Date(date.getTime()));
            });
        }
    }, {
        key: 'handleTimeChange',
        value: function handleTimeChange() {
            var _this3 = this;

            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hour';
            var val = arguments[1];

            this.setState(_defineProperty({}, type, val), function () {
                var _state2 = _this3.state,
                    hour = _state2.hour,
                    minute = _state2.minute,
                    second = _state2.second,
                    value = _state2.value;

                if (!value) {
                    value = new Date();
                }

                value.setHours(hour, minute, second);
                _this3.setState({
                    value: value
                }, function () {
                    // onChange date
                    _this3.props.onChange(new Date(value.getTime()));
                });
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!nextProps.value) {
                return;
            }
            // not have value or value changed
            if (!this.props.value || nextProps.value.getTime() !== this.props.value.getTime()) {
                this.setState(this.initDateTime(nextProps.value));
            }
        }
    }, {
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            this.handleOpen(false);
        }
    }, {
        key: 'handleOpen',
        value: function handleOpen(open) {
            this.setState({
                open: open,
                showDate: open
            });
        }
    }, {
        key: 'handleConfirm',
        value: function handleConfirm() {
            var _this4 = this;

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
                    _this4.props.onChange(new Date(value.getTime()));
                });
                if (_preventClose) {
                    return;
                }
            }
            this.handleOpen(false);
        }
    }, {
        key: 'togglePicker',
        value: function togglePicker() {
            var showDate = this.state.showDate;

            this.setState({
                showDate: !showDate
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _props2 = this.props,
                className = _props2.className,
                begin = _props2.begin,
                end = _props2.end,
                format = _props2.format,
                confirm = _props2.confirm,
                position = _props2.position,
                placeHolder = _props2.placeHolder,
                _onClick = _props2.onClick,
                onBlur = _props2.onBlur,
                onFocus = _props2.onFocus;
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
                { className: klassName('datetime-picker', className, '_' + position) },
                React.createElement(
                    'div',
                    { className: '_input', onClick: function onClick() {
                            _this5.handleOpen(true);
                            if (_onClick) _onClick();
                        } },
                    React.createElement('input', { type: 'text', placeholder: placeHolder, readOnly: true,
                        value: date, onFocus: onFocus, onBlur: onBlur }),
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
    }]);

    return DateTimePicker;
}(Component);

DateTimePicker.propTypes = {
    format: PropTypes.string.isRequired,
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    confirm: PropTypes.element,
    placeHolder: PropTypes.string,
    position: PropTypes.oneOf(['left', 'bottom', 'top', 'right'])
};

DateTimePicker.defaultProps = {
    format: 'yyyy-MM-dd',
    confirm: React.createElement(
        'button',
        null,
        'confirm'
    ),
    placeHolder: 'select date',
    position: 'bottom'
};

module.exports = documentClickCmp(DateTimePicker);