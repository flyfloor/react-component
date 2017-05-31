'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var extractDate = require('./util/datetime').extractDate;
var capitalize = require('./util/misc').capitalize;

var constants = require('./util/constants');
var WEEK_LABEL = constants.WEEK_LABEL,
    MONTH_LABEL = constants.MONTH_LABEL;

var klassName = require('./util/className');

var TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

var Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        var _this$initDate = _this.initDate(),
            year = _this$initDate.year,
            month = _this$initDate.month,
            day = _this$initDate.day,
            value = _this$initDate.value;

        var type = props.type;


        _this.handleClick = _this.handleClick.bind(_this);
        _this.handlePreMonth = _this.handlePreMonth.bind(_this);
        _this.handleNextMonth = _this.handleNextMonth.bind(_this);
        _this.handlePreYear = _this.handlePreYear.bind(_this);
        _this.handleNextYear = _this.handleNextYear.bind(_this);
        _this.renderPreview = _this.renderPreview.bind(_this);
        _this.handleYearPickerClick = _this.handleYearPickerClick.bind(_this);
        _this.handleMonthPickerClick = _this.handleMonthPickerClick.bind(_this);
        _this.handlePreYearRange = _this.handlePreYearRange.bind(_this);
        _this.handleNextYearRange = _this.handleNextYearRange.bind(_this);
        _this.pickYear = _this.pickYear.bind(_this);
        _this.pickMonth = _this.pickMonth.bind(_this);
        _this.renderMonthPicker = _this.renderMonthPicker.bind(_this);
        _this.renderYearPicker = _this.renderYearPicker.bind(_this);
        _this.renderDayPicker = _this.renderDayPicker.bind(_this);

        _this.state = {
            year: year, month: month, day: day, value: value, current: capitalize(type)
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: 'initDate',
        value: function initDate() {
            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

            date = date || new Date();
            // initialize hour, minute, second
            date.setHours(0, 0, 0, 0);
            // date, month initialize by type
            var type = this.props.type;

            if (type !== 'day') {
                date.setDate(1);
            }
            if (type === 'year') {
                date.setMonth(0);
            }

            return Object.assign(extractDate(date), { value: date });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(value) {
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
            this.props.onChange(value);
        }
    }, {
        key: 'handlePreMonth',
        value: function handlePreMonth() {
            var _state = this.state,
                month = _state.month,
                year = _state.year;

            if (month - 1 <= 0) {
                this.setState({ month: 12, year: year - 1 });
            } else {
                this.setState({ month: month - 1 });
            }
        }
    }, {
        key: 'handleNextMonth',
        value: function handleNextMonth() {
            var _state2 = this.state,
                month = _state2.month,
                year = _state2.year;

            if (month + 1 > 12) {
                this.setState({ month: 1, year: year + 1 });
            } else {
                this.setState({ month: month + 1 });
            }
        }
    }, {
        key: 'handlePreYear',
        value: function handlePreYear() {
            var year = this.state.year;

            this.setState({
                year: year - 1
            });
        }
    }, {
        key: 'handleNextYear',
        value: function handleNextYear() {
            var year = this.state.year;

            this.setState({
                year: year + 1
            });
        }

        // show preview

    }, {
        key: 'renderPreview',
        value: function renderPreview() {
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
        }

        // year picker toggle

    }, {
        key: 'handleYearPickerClick',
        value: function handleYearPickerClick(year) {
            var type = this.props.type;
            // if type is not year, set month picker display

            if (type !== 'year') {
                return this.setState({
                    current: 'Month',
                    year: year
                });
            }
            // type is month, value change
            var value = this.state.value;

            value.setYear(year);

            this.setState({
                year: year,
                value: value
            });

            this.props.onChange(new Date(value.getTime()));
        }

        // month picker toggle

    }, {
        key: 'handleMonthPickerClick',
        value: function handleMonthPickerClick(month) {
            var type = this.props.type;
            // if type is day, set day picker display

            if (type === 'day') {
                return this.setState({
                    current: 'Day',
                    month: month
                });
            }
            // type is month or year, value change
            var _state4 = this.state,
                value = _state4.value,
                year = _state4.year;

            value.setMonth(month - 1);
            value.setYear(year);

            this.setState({
                month: month,
                value: value
            });
            this.props.onChange(new Date(value.getTime()));
        }

        // year picker range change

    }, {
        key: 'handlePreYearRange',
        value: function handlePreYearRange() {
            this.setState({
                year: this.state.year - 12
            });
        }

        // year picker range change

    }, {
        key: 'handleNextYearRange',
        value: function handleNextYearRange() {
            this.setState({
                year: this.state.year + 12
            });
        }
    }, {
        key: 'pickYear',
        value: function pickYear() {
            this.setState({
                current: 'Year'
            });
        }
    }, {
        key: 'pickMonth',
        value: function pickMonth() {
            this.setState({
                current: 'Month'
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.value !== this.props.value) {
                this.setState(this.initDate(nextProps.value));
            }
        }
    }, {
        key: 'renderMonthPicker',
        value: function renderMonthPicker() {
            var _this2 = this;

            var _state5 = this.state,
                year = _state5.year,
                month = _state5.month;

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
                                        return _this2.handleMonthPickerClick(index + 1);
                                    } },
                                label
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: 'renderYearPicker',
        value: function renderYearPicker() {
            var _this3 = this;

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
                            return _this3.handleYearPickerClick(i);
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
                                return _this3.handlePreYearRange(beginY);
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
        }
    }, {
        key: 'renderDayPicker',
        value: function renderDayPicker() {
            var _state6 = this.state,
                year = _state6.year,
                month = _state6.month,
                value = _state6.value;

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
                        React.createElement(CalendarItem, { active: value.getTime() == itemDate.getTime() && !isDisabled,
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
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                showPreview = _props2.showPreview,
                type = _props2.type;
            var current = this.state.current;

            var currentPicker = this['render' + current + 'Picker']();
            return React.createElement(
                'div',
                { className: klassName(this.props.className, 'calendar') },
                showPreview && type === 'day' ? this.renderPreview() : null,
                currentPicker
            );
        }
    }]);

    return Calendar;
}(Component);

Calendar.defaultProps = {
    className: "",
    showPreview: true,
    type: 'day'
};

Calendar.propTypes = {
    className: PropTypes.string,
    showPreview: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['day', 'month', 'year'])
};

var CalendarItem = function (_Component2) {
    _inherits(CalendarItem, _Component2);

    function CalendarItem(props) {
        _classCallCheck(this, CalendarItem);

        var _this4 = _possibleConstructorReturn(this, (CalendarItem.__proto__ || Object.getPrototypeOf(CalendarItem)).call(this, props));

        _this4.handleClick = _this4.handleClick.bind(_this4);
        return _this4;
    }

    _createClass(CalendarItem, [{
        key: 'handleClick',
        value: function handleClick(value) {
            if (!this.props.disabled) this.props.onClick(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

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
                        return _this5.handleClick(value);
                    } },
                this.props.label
            );
        }
    }]);

    return CalendarItem;
}(Component);

CalendarItem.propTypes = {
    onClick: PropTypes.func
};

module.exports = Calendar;