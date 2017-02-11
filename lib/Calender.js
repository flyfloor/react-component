'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var extractDate = require('./util/datetime').extractDate;
var capitalize = require('./util/misc').capitalize;

var constants = require('./util/constants');
var WEEK_LABEL = constants.WEEK_LABEL,
    MONTH_LABEL = constants.MONTH_LABEL;

var klassName = require('./util/className');

var TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

var Calender = React.createClass({
    displayName: 'Calender',
    getInitialState: function getInitialState() {
        var _initDate = this.initDate(),
            year = _initDate.year,
            month = _initDate.month,
            day = _initDate.day,
            value = _initDate.value;

        var type = this.props.type;

        return { year: year, month: month, day: day, value: value, current: capitalize(type) };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: "",
            showPreview: true,
            type: 'day'
        };
    },


    propTypes: {
        className: PropTypes.string,
        showPreview: PropTypes.bool,
        value: PropTypes.instanceOf(Date),
        type: PropTypes.oneOf(['day', 'month', 'year'])
    },

    initDate: function initDate() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

        date = date || new Date();
        date.setHours(0, 0, 0, 0);

        return Object.assign(extractDate(date), { value: date });
    },
    handleClick: function handleClick(value) {
        var _extractDate = extractDate(value),
            year = _extractDate.year,
            month = _extractDate.month,
            day = _extractDate.day;

        this.setState({
            value: value,
            year: year,
            month: month,
            day: day
        });
        if (this.props.onChange) this.props.onChange(value);
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
    handlePreYear: function handlePreYear() {
        var year = this.state.year;

        this.setState({
            year: year - 1
        });
    },
    handleNextYear: function handleNextYear() {
        var year = this.state.year;

        this.setState({
            year: year + 1
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState(this.initDate(nextProps.value));
        }
    },


    // show preview
    renderPreview: function renderPreview() {
        var _state3 = this.state,
            year = _state3.year,
            month = _state3.month,
            day = _state3.day;

        var displayW = WEEK_LABEL[new Date(year, month - 1, day).getDay()];

        return React.createElement(
            'div',
            { className: '_label' },
            React.createElement(
                'a',
                { href: 'javascript:;', className: '_year', onClick: this.pickYear },
                year
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
                    month,
                    '\u6708 ',
                    day,
                    '\u65E5'
                )
            )
        );
    },


    // year picker toggle
    handleYearPickerClick: function handleYearPickerClick(year) {
        var type = this.props.type;
        // if type is not year, set month picker display

        if (type !== 'year') {
            this.setState({
                current: 'Month',
                year: year
            });
            return;
        }

        this.setState({
            year: year
        });
    },


    // month picker toggle
    handleMonthPickerClick: function handleMonthPickerClick(month) {
        var type = this.props.type;
        // if type is day, set day picker display

        if (type === 'day') {
            this.setState({
                current: 'Day',
                month: month
            });
            return;
        }

        this.setState({
            month: month
        });
    },


    // year picker range change
    handlePreYearRange: function handlePreYearRange() {
        this.setState({
            year: this.state.year - 12
        });
    },


    // year picker range change
    handleNextYearRange: function handleNextYearRange() {
        this.setState({
            year: this.state.year + 12
        });
    },
    pickYear: function pickYear() {
        this.setState({
            current: 'Year'
        });
    },
    pickMonth: function pickMonth() {
        this.setState({
            current: 'Month'
        });
    },
    renderMonthPicker: function renderMonthPicker() {
        var _this = this;

        var _state4 = this.state,
            year = _state4.year,
            month = _state4.month;

        return React.createElement(
            'div',
            { className: '_month-picker' },
            React.createElement(
                'div',
                { className: '_picker-label' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _prev _year', onClick: this.handlePreYear },
                    React.createElement('i', null)
                ),
                React.createElement(
                    'div',
                    { className: '_link' },
                    React.createElement(
                        'a',
                        { href: 'javascript:;', onClick: this.pickYear },
                        year,
                        ' '
                    ),
                    React.createElement(
                        'span',
                        null,
                        '\u5E74 ',
                        month,
                        ' \u6708'
                    )
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _next _year', onClick: this.handleNextYear },
                    React.createElement('i', null)
                )
            ),
            React.createElement(
                'ul',
                { className: '_picker-list' },
                MONTH_LABEL.map(function (label, index) {
                    var active = index + 1 === month ? '_active' : '';
                    return React.createElement(
                        'li',
                        { key: 'month-picker-' + (index + 1) },
                        React.createElement(
                            'a',
                            { href: 'javascript:;', className: active,
                                onClick: function onClick() {
                                    return _this.handleMonthPickerClick(index + 1);
                                } },
                            label
                        )
                    );
                })
            )
        );
    },
    renderYearPicker: function renderYearPicker() {
        var _this2 = this;

        var year = this.state.year;

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

        return React.createElement(
            'div',
            { className: '_year-picker' },
            React.createElement(
                'div',
                { className: '_picker-label' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _prev', onClick: function onClick() {
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
        );
    },
    renderDayPicker: function renderDayPicker() {
        var _state5 = this.state,
            year = _state5.year,
            month = _state5.month,
            value = _state5.value;

        // date count in that month

        var dateCount = new Date(year, month, 0).getDate();

        // week index
        var index = new Date(year, month - 1, 1).getDay();
        var matrixNodes = [[]];
        var _props = this.props,
            begin = _props.begin,
            end = _props.end;


        for (var i = 0; i < dateCount + index; i++) {
            if (i < index) {
                matrixNodes[0].push(React.createElement('td', { key: 'canlender-col-' + i }));
            } else {
                var _index = i - index + 1;
                var row = Math.floor(i / 7);
                var itemDate = new Date(year, month - 1, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];

                var isDisabled = itemDate < begin || itemDate > end;

                matrixNodes[row].push(React.createElement(
                    'td',
                    { key: 'canlender-col-' + i },
                    React.createElement(Calender.Item, { active: value.getTime() == itemDate.getTime() && !isDisabled,
                        disabled: isDisabled, isToday: TODAY.getDate() == itemDate.getDate(),
                        onClick: this.handleClick, value: itemDate, label: _index })
                ));
            }
        }

        return React.createElement(
            'div',
            { className: '_day-picker' },
            React.createElement(
                'div',
                { className: '_picker-label' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _prev _year', onClick: this.handlePreYear },
                    React.createElement('i', null)
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _prev', onClick: this.handlePreMonth },
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
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _next _year', onClick: this.handleNextYear },
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
    },
    render: function render() {
        var _props2 = this.props,
            showPreview = _props2.showPreview,
            type = _props2.type;
        var current = this.state.current;

        var currentPicker = this['render' + current + 'Picker']();
        return React.createElement(
            'div',
            { className: klassName(this.props.className, 'calender') },
            showPreview && type === 'day' ? this.renderPreview() : null,
            currentPicker
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