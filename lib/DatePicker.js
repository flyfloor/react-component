'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('./util/date');

var _util = require('./util/util');

var _Calender = require('./Calender');

var _Calender2 = _interopRequireDefault(_Calender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = _react2.default.createClass({
    displayName: 'DatePicker',
    getInitialState: function getInitialState() {
        var value = this.initDate();
        return {
            value: value
        };
    },
    initDate: function initDate() {
        var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _validateDate = (0, _date.validateDate)(defaultValue, this.dateParams());

        var year = _validateDate.year;
        var month = _validateDate.month;
        var day = _validateDate.day;

        return (0, _date.formatDate)(year, month, day);
    },
    dateParams: function dateParams() {
        return {
            begin: this.props.begin,
            end: this.props.end
        };
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'ui date-picker' },
            _react2.default.createElement(
                'div',
                { className: '_input' },
                this.state.value
            ),
            _react2.default.createElement(
                'div',
                { className: '_picker' },
                _react2.default.createElement(_Calender2.default, { date: this.state.value })
            )
        );
    }
});

exports.default = DatePicker;