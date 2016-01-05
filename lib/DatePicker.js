'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('./util/date');

var _util = require('./util/util');

var _DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _DocumentClickMixin2 = _interopRequireDefault(_DocumentClickMixin);

var _Calender = require('./Calender');

var _Calender2 = _interopRequireDefault(_Calender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = _react2.default.createClass({
    displayName: 'DatePicker',

    mixins: [_DocumentClickMixin2.default],
    propTypes: {
        onChange: _react2.default.PropTypes.func
    },
    getInitialState: function getInitialState() {
        var value = this.initDate();
        return {
            value: value,
            showPicker: false
        };
    },
    initDate: function initDate() {
        var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _dateStr2Obj = (0, _date.dateStr2Obj)(defaultValue, this.dateParams());

        var year = _dateStr2Obj.year;
        var month = _dateStr2Obj.month;
        var day = _dateStr2Obj.day;

        return (0, _date.obj2DateStr)(year, month, day);
    },
    dateParams: function dateParams() {
        return {
            begin: this.props.begin,
            end: this.props.end
        };
    },
    handleValChange: function handleValChange(value) {
        this.setState({
            value: value,
            showPicker: false
        });
        if (this.props.onChange) this.props.onChange(value);
    },
    onOtherDomClick: function onOtherDomClick(e) {
        this.setState({
            showPicker: false
        });
    },
    render: function render() {
        var _this = this;

        return _react2.default.createElement(
            'div',
            { className: 'ui date-picker' },
            _react2.default.createElement('input', { className: '_input', onClick: function onClick() {
                    _this.setState({ showPicker: true });
                }, value: this.state.value, readOnly: true }),
            this.state.showPicker ? _react2.default.createElement(
                'div',
                { className: '_picker' },
                _react2.default.createElement(_Calender2.default, { begin: this.props.begin, end: this.props.end, value: this.state.value, onChange: this.handleValChange })
            ) : null
        );
    }
});

exports.default = DatePicker;