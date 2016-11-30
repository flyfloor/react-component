'use strict';

var React = require('react');
var dateUtil = require('./util/date');
var dateStr2Obj = dateUtil.dateStr2Obj,
    obj2DateStr = dateUtil.obj2DateStr,
    date2DateStr = dateUtil.date2DateStr;


var constants = require('./util/constants');
var WEEK_LABEL = constants.WEEK_LABEL,
    MONTH_LABEL = constants.MONTH_LABEL;


var klassName = require('./util/className');

var Calender = React.createClass({
    displayName: 'Calender',
    getInitialState: function getInitialState() {
        var _initDate = this.initDate(),
            year = _initDate.year,
            month = _initDate.month,
            day = _initDate.day,
            value = _initDate.value;

        return { year: year, month: month, day: day, value: value, showYear: false, showMonth: false };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: ""
        };
    },


    propTypes: {
        className: React.PropTypes.string
    },

    initDate: function initDate() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

        var _dateStr2Obj = dateStr2Obj(date, this.dateParams()),
            year = _dateStr2Obj.year,
            month = _dateStr2Obj.month,
            day = _dateStr2Obj.day;

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
        var _props = this.props,
            begin = _props.begin,
            end = _props.end;

        return { begin: begin, end: end };
    },
    handlePreMonth: function handlePreMonth() {
        var _state = this.state,
            month = _state.month,
            year = _state.year;

        if (month - 1 <= 0) {
            this.setState({ month: 12, year: year - 1 });
        } else {
            this.setState({ month: month - 1 });
        }
    },
    handleNextMonth: function handleNextMonth() {
        var _state2 = this.state,
            month = _state2.month,
            year = _state2.year;

        if (month + 1 > 12) {
            this.setState({ month: 1, year: year + 1 });
        } else {
            this.setState({ month: month + 1 });
        }
    },
    renderDisplay: function renderDisplay() {
        var _dateStr2Obj2 = dateStr2Obj(this.state.value),
            displayY = _dateStr2Obj2.year,
            displayM = _dateStr2Obj2.month,
            displayD = _dateStr2Obj2.day;

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
                    '\u6708 ',
                    displayD,
                    '\u65E5'
                )
            )
        );
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState(this.initDate(nextProps.value));
        }
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

        var _state3 = this.state,
            showMonth = _state3.showMonth,
            year = _state3.year,
            month = _state3.month;

        var monthNodes = showMonth ? React.createElement(
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
                        year,
                        '\u5E74 '
                    ),
                    React.createElement(
                        'span',
                        null,
                        month,
                        '\u6708'
                    )
                )
            ),
            React.createElement(
                'ul',
                { className: '_picker-list' },
                MONTH_LABEL.map(function (label, index) {
                    return React.createElement(
                        'li',
                        { key: 'month-picker-' + (index + 1) },
                        React.createElement(
                            'a',
                            { href: 'javascript:;',
                                onClick: function onClick() {
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

        var _state4 = this.state,
            year = _state4.year,
            showYear = _state4.showYear;

        var beginY = year - 6;
        var endY = year + 5;

        var yearRangeNodes = [];

        var _loop = function _loop(i) {
            var active = year === i ? '_active' : '';
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

        for (var i = beginY; i <= endY; i++) {
            _loop(i);
        }
        var yearPickerNodes = showYear ? React.createElement(
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
                { className: '_picker-list' },
                yearRangeNodes
            )
        ) : null;

        return yearPickerNodes;
    },
    renderDayPicker: function renderDayPicker() {
        var TODAY = date2DateStr(new Date());
        var _state5 = this.state,
            year = _state5.year,
            month = _state5.month,
            value = _state5.value,
            showYear = _state5.showYear,
            showMonth = _state5.showMonth;

        var dateCount = new Date(year, month, 0).getDate();
        var index = new Date(year, month - 1, 1).getDay();
        var matrixNodes = [[]];
        var _props2 = this.props,
            begin = _props2.begin,
            end = _props2.end;


        for (var i = 0; i < dateCount + index; i++) {
            if (i < index) {
                matrixNodes[0].push(React.createElement('td', { key: 'canlender-col-' + i }));
            } else {
                var _index = i - index + 1;
                var row = Math.floor(i / 7);
                var itemDateStr = obj2DateStr(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];

                var isDisabled = itemDateStr < begin || itemDateStr > end;
                var itemVal = new Date(itemDateStr);

                matrixNodes[row].push(React.createElement(
                    'td',
                    { key: 'canlender-col-' + i },
                    React.createElement(Calender.Item, { active: value == itemDateStr && !isDisabled,
                        disabled: isDisabled, isToday: TODAY == itemDateStr,
                        onClick: this.handleClick, value: itemVal, label: _index })
                ));
            }
        }

        var dayNodes = showYear || showMonth ? null : React.createElement(
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
                        ' ',
                        year,
                        ' '
                    ),
                    React.createElement(
                        'span',
                        null,
                        '\u5E74 '
                    ),
                    React.createElement(
                        'span',
                        { className: '_month-link', onClick: this.pickMonth },
                        ' ',
                        month,
                        ' '
                    ),
                    React.createElement(
                        'span',
                        null,
                        '\u6708'
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
                            '\u65E5'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '\u4E00'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '\u4E8C'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '\u4E09'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '\u56DB'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '\u4E94'
                        ),
                        React.createElement(
                            'td',
                            null,
                            '\u516D'
                        )
                    ),
                    matrixNodes.map(function (n, i) {
                        return React.createElement(
                            'tr',
                            { key: 'canlender-row-' + i },
                            n
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
            { className: klassName(this.props.className, 'calender') },
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

        var _props3 = this.props,
            value = _props3.value,
            disabled = _props3.disabled,
            active = _props3.active,
            isToday = _props3.isToday;

        var className = ['_day'];
        if (isToday) className.push('_today');
        if (disabled) className.push('_disabled');
        if (active) className.push('_active');
        className = className.join(' ');
        return React.createElement(
            'a',
            { href: 'javascript:;', className: className,
                onClick: function onClick() {
                    return _this3.handleClick(value);
                } },
            this.props.label
        );
    }
});

module.exports = Calender;