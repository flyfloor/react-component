'use strict';

var React = require('react');

var _require = require('./util/date');

var dateStr2Obj = _require.dateStr2Obj;
var obj2DateStr = _require.obj2DateStr;

var _require2 = require('./util/util');

var initMaxAndMiniByNum = _require2.initMaxAndMiniByNum;

var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var Calender = require('./Calender');

var DatePicker = React.createClass({
    displayName: 'DatePicker',

    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: React.PropTypes.func
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

        var _dateStr2Obj = dateStr2Obj(defaultValue, this.dateParams());

        var year = _dateStr2Obj.year;
        var month = _dateStr2Obj.month;
        var day = _dateStr2Obj.day;

        return obj2DateStr(year, month, day);
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

        return React.createElement(
            'div',
            { className: 'ui date-picker' },
            React.createElement('input', { className: '_input', onClick: function onClick() {
                    _this.setState({ showPicker: true });
                }, value: this.state.value, readOnly: true }),
            this.state.showPicker ? React.createElement(
                'div',
                { className: '_picker' },
                React.createElement(Calender, { begin: this.props.begin, end: this.props.end, value: this.state.value, onChange: this.handleValChange })
            ) : null
        );
    }
});

module.exports = DatePicker;