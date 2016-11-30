'use strict';

var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
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
        return { value: value, open: false };
    },
    initDate: function initDate() {
        var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

        var _dateStr2Obj = dateStr2Obj(defaultValue, this.dateParams()),
            year = _dateStr2Obj.year,
            month = _dateStr2Obj.month,
            day = _dateStr2Obj.day;

        return obj2DateStr(year, month, day);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: this.initDate(nextProps.value)
            });
        }
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
            open: false
        });
        if (onChange) onChange(value);
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            open: false
        });
    },
    render: function render() {
        var _this = this;

        var _state = this.state,
            open = _state.open,
            value = _state.value;
        var _props2 = this.props,
            begin = _props2.begin,
            end = _props2.end,
            className = _props2.className;

        if (open) className += ' _active';
        return React.createElement(
            'div',
            { className: klassName('datepicker', className) },
            React.createElement(
                'div',
                { className: 'input', onClick: function onClick() {
                        _this.setState({ open: true });
                    } },
                React.createElement('input', { type: 'text', className: '_input', value: value, readOnly: true }),
                React.createElement('i', null)
            ),
            React.createElement(
                ReactCssTransitionGroup,
                { className: '_picker', transitionName: 'datepicker',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? React.createElement(Calender, { begin: begin, end: end,
                    value: value, onChange: this.handleValChange }) : null
            )
        );
    }
});

module.exports = DatePicker;