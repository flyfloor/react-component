'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _date = require('./util/date');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calender = _react2.default.createClass({
    displayName: 'Calender',
    getInitialState: function getInitialState() {
        var _initDate = this.initDate();

        var year = _initDate.year;
        var month = _initDate.month;
        var day = _initDate.day;
        var value = _initDate.value;

        return { year: year, month: month, day: day, value: value };
    },
    initDate: function initDate() {
        var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? this.props.value : arguments[0];

        var _validateDate = (0, _date.validateDate)(defaultValue);

        var year = _validateDate.year;
        var month = _validateDate.month;
        var day = _validateDate.day;

        var value = (0, _date.formatDate)(year, month, day);
        return { year: year, month: month, day: day, value: value };
    },
    handleClick: function handleClick(date) {
        this.setState({
            value: (0, _date.trimDate)(date)
        });
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
    render: function render() {
        var active = false;
        var isToday = false;
        var TODAY = (0, _date.trimDate)(new Date());
        var _state = this.state;
        var year = _state.year;
        var month = _state.month;
        var day = _state.day;
        var value = _state.value;

        var dateCount = new Date(year, month, 0).getDate();
        var index = new Date(year, month - 1, 1).getDay();
        var matrixNodes = [[]];

        for (var i = 0; i < dateCount + index; i++) {
            if (i < index) {
                matrixNodes[0].push(_react2.default.createElement('td', { key: 'canlender-col-' + i }));
            } else {
                var _index = i - index + 1;
                var row = Math.floor(i / 7);
                var col = i % 7;
                var itemDate = (0, _date.formatDate)(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];
                active = value == itemDate;
                isToday = TODAY == itemDate;
                var itemVal = new Date(year, month - 1, _index);

                matrixNodes[row].push(_react2.default.createElement(
                    'td',
                    { key: 'canlender-col-' + i },
                    _react2.default.createElement(Calender.Item, { active: active, isToday: isToday, onClick: this.handleClick, value: itemVal, label: _index })
                ));
            }
        }

        return _react2.default.createElement(
            'div',
            { className: 'ui calender' },
            _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'th',
                            null,
                            _react2.default.createElement('a', { href: 'javascript:;', className: '_nav _pre', onClick: this.handlePreMonth })
                        ),
                        _react2.default.createElement(
                            'th',
                            { colSpan: '5' },
                            this.state.year,
                            '年 ',
                            this.state.month,
                            '月'
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            _react2.default.createElement('a', { href: 'javascript:;', className: '_nav _next', onClick: this.handleNextMonth })
                        )
                    )
                ),
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
    }
});

Calender.Item = _react2.default.createClass({
    displayName: 'Item',
    handleClick: function handleClick(value) {
        this.props.onClick(value);
    },
    render: function render() {
        var _this = this;

        var value = this.props.value;
        var active = this.props.active ? '_active' : '';
        var today = this.props.isToday ? '_today' : '';
        return _react2.default.createElement(
            'a',
            { href: 'javascript:;', className: active + ' ' + today + ' _day', onClick: function onClick() {
                    _this.handleClick(value);
                } },
            this.props.label
        );
    }
});

exports.default = Calender;