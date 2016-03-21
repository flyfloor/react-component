'use strict';

var React = require('react');

var _require = require('./util/date');

var dateStr2Obj = _require.dateStr2Obj;
var obj2DateStr = _require.obj2DateStr;
var date2DateStr = _require.date2DateStr;

var _require2 = require('./util/constants');

var WEEK_LABEL = _require2.WEEK_LABEL;
var MONTH_LABEL = _require2.MONTH_LABEL;


var Calender = React.createClass({
    displayName: 'Calender',
    getInitialState: function getInitialState() {
        var _initDate = this.initDate();

        var year = _initDate.year;
        var month = _initDate.month;
        var day = _initDate.day;
        var value = _initDate.value;

        return { year: year, month: month, day: day, value: value, showYear: false, showMonth: false };
    },
    initDate: function initDate() {
        var date = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _dateStr2Obj = dateStr2Obj(date, this.dateParams());

        var year = _dateStr2Obj.year;
        var month = _dateStr2Obj.month;
        var day = _dateStr2Obj.day;

        var value = obj2DateStr(year, month, day);
        return { year: year, month: month, day: day, value: value };
    },
    handleClick: function handleClick(date) {
        var value = date2DateStr(date);
        this.setState({
            value: value
        });
        if (this.props.onChange) this.props.onChange(value);
    },
    dateParams: function dateParams() {
        return {
            begin: this.props.begin,
            end: this.props.end
        };
    },
    handlePreMonth: function handlePreMonth() {
        var month = this.state.month;
        if (month - 1 <= 0) {
            var year = this.state.year - 1;
            this.setState({
                month: 12,
                year: year
            });
        } else {
            this.setState({
                month: month - 1
            });
        }
    },
    handleNextMonth: function handleNextMonth() {
        var month = this.state.month;
        if (month + 1 > 12) {
            var year = this.state.year + 1;
            this.setState({
                month: 1,
                year: year
            });
        } else {
            this.setState({
                month: month + 1
            });
        }
    },
    renderDisplay: function renderDisplay() {
        var _dateStr2Obj2 = dateStr2Obj(this.state.value);

        var displayY = _dateStr2Obj2.year;
        var displayM = _dateStr2Obj2.month;
        var displayD = _dateStr2Obj2.day;

        var displayW = WEEK_LABEL[new Date(displayY, displayM - 1, displayD).getDay()];

        return React.createElement(
            'div',
            { className: '_label' },
            React.createElement(
                'a',
                { href: 'javascript:;', className: '_year', onClick: this.pickYear },
                displayY
            ),
            React.createElement(
                'p',
                { className: '_date' },
                React.createElement(
                    'span',
                    null,
                    displayW,
                    ', '
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', onClick: this.pickMonth },
                    displayM,
                    '月 ',
                    displayD,
                    '日'
                )
            )
        );
    },
    handleYearPickerClick: function handleYearPickerClick(year) {
        this.setState({
            year: year,
            showYear: false
        });
    },
    handleMonthPickerClick: function handleMonthPickerClick(month) {
        this.setState({
            month: month,
            showMonth: false
        });
    },
    handlePreYearRange: function handlePreYearRange() {
        this.setState({
            year: this.state.year - 12
        });
    },
    handleNextYearRange: function handleNextYearRange() {
        this.setState({
            year: this.state.year + 12
        });
    },
    pickYear: function pickYear() {
        this.setState({
            showYear: true,
            showMonth: false
        });
    },
    pickMonth: function pickMonth() {
        this.setState({
            showMonth: true,
            showYear: false
        });
    },
    renderMonthPicker: function renderMonthPicker() {
        var _this = this;

        var monthNodes = this.state.showMonth ? React.createElement(
            'div',
            { className: '_month-picker' },
            React.createElement(
                'div',
                { className: '_picker-label' },
                React.createElement(
                    'div',
                    { className: '_link' },
                    React.createElement(
                        'span',
                        { onClick: this.pickYear },
                        this.state.year,
                        '年 '
                    ),
                    React.createElement(
                        'span',
                        null,
                        this.state.month,
                        '月'
                    )
                )
            ),
            React.createElement(
                'ul',
                null,
                MONTH_LABEL.map(function (label, index) {
                    return React.createElement(
                        'li',
                        { key: 'month-picker-' + (index + 1) },
                        React.createElement(
                            'a',
                            { href: 'javascript:;', onClick: function onClick() {
                                    return _this.handleMonthPickerClick(index + 1);
                                } },
                            label
                        )
                    );
                })
            )
        ) : null;

        return monthNodes;
    },
    renderYearPicker: function renderYearPicker() {
        var _this2 = this;

        var beginY = this.state.year - 6;
        var endY = this.state.year + 5;
        var yearRangeNodes = [];

        var _loop = function _loop(i) {
            var active = _this2.state.year === i ? '_active' : '';
            var isDisabled = i < 1900 ? '_disabled' : '';
            var yearItem = isDisabled ? React.createElement(
                'a',
                { href: 'javascript:;', className: isDisabled },
                i
            ) : React.createElement(
                'a',
                { href: 'javascript:;', className: active, onClick: function onClick() {
                        return _this2.handleYearPickerClick(i);
                    } },
                i
            );
            yearRangeNodes.push(React.createElement(
                'li',
                { key: 'year-picker-' + i },
                yearItem
            ));
        };

        for (var i = beginY; i < endY; i++) {
            _loop(i);
        };
        var yearPickerNodes = this.state.showYear ? React.createElement(
            'div',
            { className: '_year-picker' },
            React.createElement(
                'div',
                { className: '_picker-label' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _pre', onClick: function onClick() {
                            return _this2.handlePreYearRange(beginY);
                        } },
                    React.createElement('i', null)
                ),
                React.createElement(
                    'div',
                    { className: '_link' },
                    React.createElement(
                        'span',
                        null,
                        beginY,
                        ' ~ ',
                        endY
                    )
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _next', onClick: this.handleNextYearRange },
                    React.createElement('i', null)
                )
            ),
            React.createElement(
                'ul',
                null,
                yearRangeNodes
            )
        ) : null;

        return yearPickerNodes;
    },
    renderDayPicker: function renderDayPicker() {
        var TODAY = date2DateStr(new Date());
        var _state = this.state;
        var year = _state.year;
        var month = _state.month;
        var day = _state.day;
        var value = _state.value;

        var dateCount = new Date(year, month, 0).getDate();
        var index = new Date(year, month - 1, 1).getDay();
        var matrixNodes = [[]];
        var _props = this.props;
        var begin = _props.begin;
        var end = _props.end;


        for (var i = 0; i < dateCount + index; i++) {
            if (i < index) {
                matrixNodes[0].push(React.createElement('td', { key: 'canlender-col-' + i }));
            } else {
                var _index = i - index + 1;
                var row = Math.floor(i / 7);
                var itemDateStr = obj2DateStr(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];

                var isDisabled = itemDateStr < begin || itemDateStr > end;

                var isToday = TODAY == itemDateStr;
                var active = value == itemDateStr && !isDisabled;

                var itemVal = new Date(itemDateStr);

                matrixNodes[row].push(React.createElement(
                    'td',
                    { key: 'canlender-col-' + i },
                    React.createElement(Calender.Item, { active: active, disabled: isDisabled, isToday: isToday, onClick: this.handleClick, value: itemVal, label: _index })
                ));
            }
        }

        var dayNodes = this.state.showYear || this.state.showMonth ? null : React.createElement(
            'div',
            { className: '_day-picker' },
            React.createElement(
                'div',
                { className: '_picker-label' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _pre', onClick: this.handlePreMonth },
                    React.createElement('i', null)
                ),
                React.createElement(
                    'div',
                    { className: '_link' },
                    React.createElement(
                        'span',
                        { className: '_year-link', onClick: this.pickYear },
                        this.state.year,
                        '年 '
                    ),
                    React.createElement(
                        'span',
                        { className: '_month-link', onClick: this.pickMonth },
                        this.state.month,
                        '月'
                    )
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _next', onClick: this.handleNextMonth },
                    React.createElement('i', null)
                )
            ),
            React.createElement(
                'table',
                null,
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        { className: '_week' },
                        React.createElement(
                            'td',
                            null,
                            '日'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '一'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '二'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '三'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '四'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '五'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '六'
                        )
                    ),
                    matrixNodes.map(function (item, index) {
                        return React.createElement(
                            'tr',
                            { key: 'canlender-row-' + index },
                            item
                        );
                    })
                )
            )
        );

        return dayNodes;
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'ui calender' },
            this.renderDisplay(),
            this.renderYearPicker(),
            this.renderMonthPicker(),
            this.renderDayPicker()
        );
    }
});

Calender.Item = React.createClass({
    displayName: 'Item',

    propTypes: {
        onClick: React.PropTypes.func
    },
    handleClick: function handleClick(value) {
        if (!this.props.disabled) this.props.onClick(value);
    },
    render: function render() {
        var _this3 = this;

        var value = this.props.value;
        var disabled = this.props.disabled ? '_disabled' : '';
        var active = this.props.active ? '_active' : '';
        var today = this.props.isToday ? '_today' : '';
        return React.createElement(
            'a',
            { href: 'javascript:;', className: active + ' ' + disabled + ' ' + today + ' _day', onClick: function onClick() {
                    return _this3.handleClick(value);
                } },
            this.props.label
        );
    }
});

module.exports = Calender;