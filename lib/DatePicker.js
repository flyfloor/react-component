'use strict';

var React = require('react');

var _require = require('./util/date');

var dateStr2Obj = _require.dateStr2Obj;
var obj2DateStr = _require.obj2DateStr;

var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var Calender = require('./Calender');

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
        var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _dateStr2Obj = dateStr2Obj(defaultValue, this.dateParams());

        var year = _dateStr2Obj.year;
        var month = _dateStr2Obj.month;
        var day = _dateStr2Obj.day;

        return obj2DateStr(year, month, day);
    },
    dateParams: function dateParams() {
        var _props = this.props;
        var begin = _props.begin;
        var end = _props.end;

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

        var _state = this.state;
        var showPicker = _state.showPicker;
        var value = _state.value;
        var _props2 = this.props;
        var begin = _props2.begin;
        var end = _props2.end;
        var className = _props2.className;

        if (showPicker) className += ' _active';
        return React.createElement(
            'div',
            { className: 'ui date-picker ' + className },
            React.createElement('input', { className: '_input', onClick: function onClick() {
                    _this.setState({ showPicker: true });
                }, value: value, readOnly: true }),
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