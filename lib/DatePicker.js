'use strict';

var React = require('react');
var dateUtil = require('./util/date');
var dateStr2Obj = dateUtil.dateStr2Obj,
    obj2DateStr = dateUtil.obj2DateStr;


var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var Calender = require('./Calender');
var klassName = require('./util/className');

var DatePicker = React.createClass({
    displayName: 'DatePicker',

    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: React.PropTypes.func
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

        var _dateStr2Obj = dateStr2Obj(defaultValue, this.dateParams()),
            year = _dateStr2Obj.year,
            month = _dateStr2Obj.month,
            day = _dateStr2Obj.day;

        return obj2DateStr(year, month, day);
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
        return React.createElement(
            'div',
            { className: klassName('datepicker', className) },
            React.createElement(
                'div',
                { className: 'input', onClick: function onClick() {
                        _this.setState({ showPicker: true });
                    } },
                React.createElement('input', { type: 'text', className: '_input', value: value, readOnly: true }),
                React.createElement('i', null)
            ),
            React.createElement(
                'div',
                { className: '_picker' },
                React.createElement(Calender, { begin: begin, end: end,
                    value: value, onChange: this.handleValChange })
            )
        );
    }
});

module.exports = DatePicker;