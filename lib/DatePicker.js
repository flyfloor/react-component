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
    getInitialState: function getInitialState() {
        var value = this.initDate();
        return {
            value: value,
            showPicker: false
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
    handleValChange: function handleValChange(value) {
        var _this = this;

        this.setState({
            value: value
        }, function () {
            _this.setState({
                showPicker: false
            });
        });
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            showPicker: false
        });
    },
    showPicker: function showPicker() {
        console.log(this.state.value);
        this.setState({
            showPicker: true
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'ui date-picker' },
            _react2.default.createElement('input', { className: '_input', onClick: this.showPicker, value: this.state.value, readOnly: true }),
            this.state.showPicker ? _react2.default.createElement(
                'div',
                { className: '_picker' },
                _react2.default.createElement(_Calender2.default, { value: this.state.value, onChange: this.handleValChange })
            ) : null
        );
    }
});

exports.default = DatePicker;