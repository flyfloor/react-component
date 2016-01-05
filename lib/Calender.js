'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('./util/date');

var _constants = require('./util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calender = _react2.default.createClass({
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

        var _validateDate = (0, _date.validateDate)(date, this.dateParams());

        var year = _validateDate.year;
        var month = _validateDate.month;
        var day = _validateDate.day;

        var value = (0, _date.formatDate)(year, month, day);
        return { year: year, month: month, day: day, value: value };
    },
    handleClick: function handleClick(date) {
        var value = (0, _date.trimDate)(date);
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
        var _validateDate2 = (0, _date.validateDate)(this.state.value);

        var displayY = _validateDate2.year;
        var displayM = _validateDate2.month;
        var displayD = _validateDate2.day;

        var displayW = _constants.WEEK_LABEL[new Date(displayY, displayM - 1, displayD).getDay()];

        return _react2.default.createElement(
            'div',
            { className: '_label' },
            _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: '_year', onClick: this.pickYear },
                displayY
            ),
            _react2.default.createElement(
                'p',
                { className: '_date' },
                _react2.default.createElement(
                    'span',
                    null,
                    displayW,
                    ', '
                ),
                _react2.default.createElement(
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
            showYear: true
        });
    },
    pickMonth: function pickMonth() {
        this.setState({
            showMonth: true
        });
    },
    renderMonthPicker: function renderMonthPicker() {
        var _this = this;

        var monthNodes = this.state.showMonth ? _react2.default.createElement(
            'div',
            { className: '_month-picker' },
            _react2.default.createElement(
                'div',
                { className: '_picker-label' },
                _react2.default.createElement(
                    'div',
                    { className: '_link' },
                    _react2.default.createElement(
                        'span',
                        null,
                        this.state.year,
                        '年 ',
                        this.state.month,
                        '月'
                    )
                )
            ),
            _react2.default.createElement(
                'ul',
                null,
                _constants.MONTH_LABEL.map(function (label, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: 'month-picker-' + (index + 1) },
                        _react2.default.createElement(
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
            var yearItem = isDisabled ? _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: isDisabled },
                i
            ) : _react2.default.createElement(
                'a',
                { href: 'javascript:;', className: active, onClick: function onClick() {
                        return _this2.handleYearPickerClick(i);
                    } },
                i
            );
            yearRangeNodes.push(_react2.default.createElement(
                'li',
                { key: 'year-picker-' + i },
                yearItem
            ));
        };

        for (var i = beginY; i < endY; i++) {
            _loop(i);
        };
        var yearPickerNodes = this.state.showYear ? _react2.default.createElement(
            'div',
            { className: '_year-picker' },
            _react2.default.createElement(
                'div',
                { className: '_picker-label' },
                _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _pre', onClick: function onClick() {
                            return _this2.handlePreYearRange(beginY);
                        } },
                    _react2.default.createElement('i', null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: '_link' },
                    _react2.default.createElement(
                        'span',
                        null,
                        beginY,
                        ' ~ ',
                        endY
                    )
                ),
                _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _next', onClick: this.handleNextYearRange },
                    _react2.default.createElement('i', null)
                )
            ),
            _react2.default.createElement(
                'ul',
                null,
                yearRangeNodes
            )
        ) : null;

        return yearPickerNodes;
    },
    renderDayPicker: function renderDayPicker() {
        var TODAY = (0, _date.trimDate)(new Date());
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
                matrixNodes[0].push(_react2.default.createElement('td', { key: 'canlender-col-' + i }));
            } else {
                var _index = i - index + 1;
                var row = Math.floor(i / 7);
                var col = i % 7;
                var itemDateStr = (0, _date.formatDate)(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];

                var isDisabled = itemDateStr < begin || itemDateStr > end;

                var isToday = TODAY == itemDateStr;
                var active = value == itemDateStr && !isDisabled;

                var itemVal = new Date(itemDateStr);

                matrixNodes[row].push(_react2.default.createElement(
                    'td',
                    { key: 'canlender-col-' + i },
                    _react2.default.createElement(Calender.Item, { active: active, disabled: isDisabled, isToday: isToday, onClick: this.handleClick, value: itemVal, label: _index })
                ));
            }
        }

        var dayNodes = this.state.showYear || this.state.showMonth ? null : _react2.default.createElement(
            'div',
            { className: '_day-picker' },
            _react2.default.createElement(
                'div',
                { className: '_picker-label' },
                _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _pre', onClick: this.handlePreMonth },
                    _react2.default.createElement('i', null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: '_link' },
                    _react2.default.createElement(
                        'span',
                        { className: '_year-link', onClick: this.pickYear },
                        this.state.year,
                        '年 '
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: '_month-link', onClick: this.pickMonth },
                        this.state.month,
                        '月'
                    )
                ),
                _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: '_nav _next', onClick: this.handleNextMonth },
                    _react2.default.createElement('i', null)
                )
            ),
            _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'tbody',
                    null,
                    _react2.default.createElement(
                        'tr',
                        { className: '_week' },
                        _react2.default.createElement(
                            'td',
                            null,
                            '日'
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            '一'
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            '二'
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            '三'
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            '四'
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            '五'
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            '六'
                        )
                    ),
                    matrixNodes.map(function (item, index) {
                        return _react2.default.createElement(
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
        return _react2.default.createElement(
            'div',
            { className: 'ui calender' },
            this.renderDisplay(),
            this.renderYearPicker(),
            this.renderMonthPicker(),
            this.renderDayPicker()
        );
    }
});

Calender.Item = _react2.default.createClass({
    displayName: 'Item',

    propTypes: {
        onClick: _react2.default.PropTypes.func
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
        return _react2.default.createElement(
            'a',
            { href: 'javascript:;', className: active + ' ' + disabled + ' ' + today + ' _day', onClick: function onClick() {
                    return _this3.handleClick(value);
                } },
            this.props.label
        );
    }
});

exports.default = Calender;