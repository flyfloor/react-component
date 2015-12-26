'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Time = require('./util/Time');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimePicker = _react2.default.createClass({
    displayName: 'TimePicker',
    getInitialState: function getInitialState() {
        var value = (0, _Time.validateTime)(this.props.value, this.timeParams());
        return {
            value: value,
            showPicker: false
        };
    },
    timeParams: function timeParams() {
        return {
            spacer: this.props.spacer,
            simple: this.props.simple,
            maxHour: this.props.maxHour,
            miniHour: this.props.miniHour,
            maxMin: this.props.maxMin,
            miniMin: this.props.miniMin,
            maxSec: this.props.maxSec,
            miniSec: this.props.miniSec
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            simple: false,
            spacer: ':',
            value: '00:00:00'
        };
    },
    handleInputChange: function handleInputChange(e) {
        this.setState({
            value: e.target.value
        });
    },
    handleBlur: function handleBlur(e) {
        var value = (0, _Time.validateTime)(e.target.value, this.timeParams());
        this.setState({
            value: value
        });
    },
    // showPicker: false,
    handleFocus: function handleFocus() {
        this.setState({
            showPicker: true
        });
    },
    formatSelectorNode: function formatSelectorNode() {
        var hourRangeNode = [],
            minRangeNode = [],
            secRangeNode = [];
        var hourRange = (0, _Time.initMaxAndMiniByNum)(this.props.maxHour, this.props.miniHour, 23);
        var minRange = (0, _Time.initMaxAndMiniByNum)(this.props.maxMin, this.props.miniMin, 59);
        var secRange = (0, _Time.initMaxAndMiniByNum)(this.props.maxSec, this.props.miniSec, 59);

        for (var i = hourRange.mini; i <= hourRange.max; i++) {
            hourRangeNode.push(_react2.default.createElement(
                'li',
                { key: 'hour-selector-' + i },
                i
            ));
        }for (var i = minRange.mini; i <= minRange.max; i++) {
            minRangeNode.push(_react2.default.createElement(
                'li',
                { key: 'min-selector-' + i },
                i
            ));
        }if (this.props.simple) {
            return _react2.default.createElement(
                'div',
                { className: '_content' },
                _react2.default.createElement(
                    'ul',
                    null,
                    hourRangeNode
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    minRangeNode
                )
            );
        }

        for (var i = secRange.mini; i <= secRange.max; i++) {
            secRangeNode.push(_react2.default.createElement(
                'li',
                { key: 'sec-selector-' + i },
                i
            ));
        }return _react2.default.createElement(
            'div',
            { className: '_content' },
            _react2.default.createElement(
                'ul',
                null,
                hourRangeNode
            ),
            _react2.default.createElement(
                'ul',
                null,
                minRangeNode
            ),
            _react2.default.createElement(
                'ul',
                null,
                secRangeNode
            )
        );
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { className: 'ui time-picker' },
            _react2.default.createElement('input', { className: '_input', type: 'text', defaultValue: this.state.value, value: this.state.value,
                onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.handleInputChange }),
            _react2.default.createElement(
                'div',
                { className: this.props.simple ? '_selector _simple' : '_selector' },
                this.state.showPicker ? this.formatSelectorNode() : null
            )
        );
    }
});

exports.default = TimePicker;