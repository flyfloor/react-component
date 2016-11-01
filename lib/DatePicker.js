'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('./util/date');

var _DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _DocumentClickMixin2 = _interopRequireDefault(_DocumentClickMixin);

var _Calender = require('./Calender');

var _Calender2 = _interopRequireDefault(_Calender);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = _react2.default.createClass({
    displayName: 'DatePicker',

    mixins: [_DocumentClickMixin2.default],
    propTypes: {
        onChange: _react2.default.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    getInitialState: function getInitialState() {
        var value = this.initDate();
        return { value: value, showPicker: false };
    },
    initDate: function initDate() {
        var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

        var _dateStr2Obj = (0, _date.dateStr2Obj)(defaultValue, this.dateParams()),
            year = _dateStr2Obj.year,
            month = _dateStr2Obj.month,
            day = _dateStr2Obj.day;

        return (0, _date.obj2DateStr)(year, month, day);
    },
    dateParams: function dateParams() {
        var _props = this.props,
            begin = _props.begin,
            end = _props.end;

        return { begin: begin, end: end };
    },
    handleValChange: function handleValChange(value) {
        var onChange = this.props.onChange;

        this.setState({
            value: value,
            showPicker: false
        });
        if (onChange) onChange(value);
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            showPicker: false
        });
    },
    render: function render() {
        var _this = this;

        var _state = this.state,
            showPicker = _state.showPicker,
            value = _state.value;
        var _props2 = this.props,
            begin = _props2.begin,
            end = _props2.end,
            className = _props2.className;

        if (showPicker) className += ' _active';
        return _react2.default.createElement(
            'div',
            { className: (0, _className2.default)('datepicker', className) },
            _react2.default.createElement(
                'div',
                { className: 'input', onClick: function onClick() {
                        _this.setState({ showPicker: true });
                    } },
                _react2.default.createElement('input', { type: 'text', className: '_input', value: value, readOnly: true }),
                _react2.default.createElement('i', null)
            ),
            _react2.default.createElement(
                'div',
                { className: '_picker' },
                _react2.default.createElement(_Calender2.default, { begin: begin, end: end,
                    value: value, onChange: this.handleValChange })
            )
        );
    }
});

exports.default = DatePicker;